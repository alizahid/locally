-- enums
-- 
create type collaborator_role as enum ('owner', 'member');

-- tables
-- 
-- users
create table users (
  id uuid not null references auth.users on delete cascade primary key,
  first_name text not null,
  last_name text not null,
  photo text,
  created_at timestamp without time zone not null default now()
);

-- projects
create table projects (
  id text primary key,
  slug text not null,
  name text not null,
  locale text not null,
  created_at timestamp without time zone not null default now()
);

-- collaborators
create table collaborators (
  id text primary key,
  project_id text not null references projects on delete cascade,
  user_id uuid not null references users on delete cascade,
  role collaborator_role not null,
  created_at timestamp without time zone not null default now()
);

-- translations
create table translations (
  id text primary key,
  project_id text not null references projects on delete cascade,
  locale text not null,
  data jsonb not null,
  created_at timestamp without time zone not null default now()
);

-- generations
create table generations (
  id text primary key,
  project_id text not null references projects on delete cascade,
  model text not null,
  locale text not null,
  phrase text not null,
  translation text not null,
  liked boolean,
  created_at timestamp without time zone not null default now()
);

-- indexes
-- 
-- projects
create unique index projects__slug on projects(slug);

-- collaborators
create unique index collaborators__user on collaborators(project_id, user_id);

-- translations
create unique index translations__locale on translations(project_id, locale);

-- generations
create index generations__phrase on generations(phrase);

-- row level security
-- 
-- users
alter table users enable row level security;

create policy "Users can view all profiles" on users for
select to authenticated using (true);

create policy "Users can create their profiles" on users for
insert to authenticated with check (id = auth.uid ());

create policy "Users can update their profiles" on users for
update to authenticated using (id = auth.uid ());

-- projects
alter table projects enable row level security;

create policy "Users can create projects" on projects for
insert to authenticated with check (true);

create policy "Collaborators can view projects" on projects for
select to authenticated using (
    id in (
      select project_id
      from collaborators
      where user_id = auth.uid ()
    )
  );

create policy "Owners can update projects" on projects for
update to authenticated using (
    id in (
      select id
      from projects
      where id in (
          select project_id
          from collaborators
          where user_id = auth.uid ()
            and ROLE = 'owner'
        )
    )
  );

-- collaborators
alter table collaborators enable row level security;

create policy "Collaborators can view themselves" on collaborators for
select to authenticated using (user_id = auth.uid ());

create policy "Owners can add collaborators" on collaborators for
insert to authenticated with check (
    project_id in (
      select id
      from projects
      where id in (
          select id
          from projects
          where id in (
              select project_id
              from collaborators
              where user_id = auth.uid ()
                and ROLE = 'owner'
            )
        )
    )
  );

create policy "Users can leave projects" on collaborators for delete to authenticated using (user_id = auth.uid ());

-- translations
alter table translations enable row level security;

create policy "Users can create translations for their projects" on translations for
insert to authenticated with check (
    project_id in (
      select id
      from projects
      where id in (
          select project_id
          from collaborators
          where user_id = auth.uid ()
        )
    )
  );

create policy "Users can view translations for their projects" on translations for
select using (
    project_id in (
      select project_id
      from collaborators
      where user_id = auth.uid ()
    )
  );

create policy "Users can update translations for their projects" on translations for
update to authenticated using (
    project_id in (
      select id
      from projects
      where id in (
          select project_id
          from collaborators
          where user_id = auth.uid ()
        )
    )
  );

create policy "Users can delete translations for their projects" on translations for delete to authenticated using (
  project_id in (
    select id
    from projects
    where id in (
        select project_id
        from collaborators
        where user_id = auth.uid ()
      )
  )
);

-- generations
alter table generations enable row level security;

create policy "Users can view generations for their projects" on generations for
select to authenticated using (
    project_id in (
      select project_id
      from collaborators
      where user_id = auth.uid ()
    )
  );

create policy "Users can update generations for their projects" on generations for
update to authenticated using (
    project_id in (
      select project_id
      from collaborators
      where user_id = auth.uid ()
    )
  );

-- functions
-- 
-- handle_new_user
create or replace function handle_new_user() returns trigger LANGUAGE plpgsql security definer as $$ begin
insert into public.users (id, first_name, last_name)
values (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name'
  );

return new;

end;

$$;

-- handle_new_project
create or replace function handle_new_project() returns trigger LANGUAGE plpgsql security definer as $$ begin
insert into collaborators (id, project_id, user_id, role)
values (
    replace(new.id, 'prj_', 'clb_'),
    new.id,
    auth.uid (),
    'owner'
  );

return new;

end;

$$;

-- triggers
-- 
-- on_user_created
create or replace trigger on_user_created
after
insert on auth.users for each row execute procedure handle_new_user();

-- on_project_created
create or replace trigger on_project_created
after
insert on projects for each row execute procedure handle_new_project();
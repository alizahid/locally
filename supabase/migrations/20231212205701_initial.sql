-- enums
-- 
create type collaborator_role as enum ('owner', 'member');

-- tables
-- 
-- users
create table users (
  id uuid not null references auth.users on delete cascade primary key,
  name text not null,
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

-- row level security
-- 
-- users
alter table users enable row level security;

alter table projects enable row level security;

alter table collaborators enable row level security;

alter table translations enable row level security;

alter table generations enable row level security;

-- indexes
-- 
-- projects
create unique index projects__slug on projects(slug);

-- collaborators
create unique index collaborators__user on collaborators(project_id, user_id);

-- generations
create index generations__phrase on generations(phrase);
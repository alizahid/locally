declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- interface required
  export interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_KEY: string
    NEXT_PUBLIC_SUPABASE_URL: string
  }
}

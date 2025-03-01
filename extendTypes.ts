declare namespace NodeJS {
    export interface ProcessEnv {
        MONGO_DB_URI: string
        DB_NAME: string
        NEXT_PUBLIC_APP_URL: string
        NEXT_PUBLIC_HOST: string
    }
}
/// <reference types="vite/client" />

declare module '*.css' {
    const content: { [className: string]: string }
    export default content
}

interface ImportMetaEnv {
    readonly VITE_NEWS_API_KEY: string
    readonly VITE_NY_NEWS_KEY: string
    readonly VITE_THE_GUARDIAN_KEY: string
}

// Vite's recommended way to extend ImportMeta
interface ImportMeta {
    readonly env: ImportMetaEnv
}

// Make process.env work in Vite
declare namespace NodeJS {
    interface ProcessEnv extends ImportMetaEnv {}
}

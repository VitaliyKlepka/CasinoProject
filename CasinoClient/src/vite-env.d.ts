/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  // Add other env variables you use here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

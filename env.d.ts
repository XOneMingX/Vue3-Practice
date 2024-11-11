/// <reference types="vite/client" />
interface ImportMetaEnv {
  GITHUB_BASE_REPO: string
  // Add other environment variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

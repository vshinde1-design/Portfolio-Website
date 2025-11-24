import { defineConfig } from 'vite'

// Dynamically import ESM-only plugin to avoid CJS/require issues in some Node environments
export default defineConfig(async () => {
  const reactPlugin = (await import('@vitejs/plugin-react')).default
  return {
    plugins: [reactPlugin()],
  }
})

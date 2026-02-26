import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const workspaceRoot = path.join(__dirname, '../..')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // standalone is for self-hosted/Docker; Vercel uses its own Next.js runtime
  ...(process.env.VERCEL ? {} : { output: 'standalone' }),
  turbopack: { root: workspaceRoot },
}
export default nextConfig

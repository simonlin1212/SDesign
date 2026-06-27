import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => ({
  // 构建用相对路径,适配 GitHub Pages 子路径(github.io/SDesign/);dev 用根路径
  base: command === 'build' ? './' : '/',
  plugins: [react(), tailwindcss()],
}))

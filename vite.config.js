/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 其他配置...
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 设置 '@' 指向 'src' 目录
      components: path.resolve(__dirname, 'src/components'), // 直接指向 'src/components' 目录
      // 你可以根据需要继续添加更多别名
    },
  },
});

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cdn from 'vite-plugin-cdn-import'

export default defineConfig({
  plugins: [
    vue(),
    cdn({
      modules: [
        {
          name: 'vue',
          var: 'Vue',
          path: `https://cdn.bootcdn.net/ajax/libs/vue/3.4.21/vue.global.prod.min.js`,
        },
        {
          name: 'vue-demi',
          var: 'VueDemi',
          path: `https://cdn.bootcdn.net/ajax/libs/vue-demi/0.14.7/index.iife.min.js`
        },
        {
          name: 'pinia',
          var: 'Pinia',
          path: `https://cdn.bootcdn.net/ajax/libs/pinia/2.1.7/pinia.iife.prod.min.js`,
        },
        // {
        //   name: 'nanoid',
        //   var: 'nanoid',
        //   path: `https://cdn.jsdelivr.net/npm/nanoid@5.0.7/nanoid.js`,
        // },
      ],
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: '/todoList_vue3/',
  build: {
    outDir: 'docs'
  },
})

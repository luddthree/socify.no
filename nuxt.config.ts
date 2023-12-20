import {env} from 'node:process'
import dotenv from 'dotenv'
dotenv.config()
import { defineNuxtConfig } from 'nuxt/config'


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss', "@vueuse/nuxt"
  ],
  
  ssr: false,

  runtimeConfig: {
    OPENAI_API_KEY: "",
    databaseFilePath: env.DATABASE_PATH,
  },

  devtools: { enabled: true }
})



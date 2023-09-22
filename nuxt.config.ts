import {env} from 'node:process'
import dotenv from 'dotenv'
dotenv.config()

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    databaseFilePath: env.DATABASE_PATH,
  },

  devtools: { enabled: true }
})

import { defineConfig } from "astro/config"
import react from "@astrojs/react"

import icon from "astro-icon"

import tailwindcss from "@tailwindcss/vite"

// https://astro.build/config
export default defineConfig({
  site: process.env.CI
    ? "https://harisraharjo.github.io"
    : "http://localhost:4321",

  integrations: [react(), icon()],

  vite: {
    plugins: [tailwindcss()],
  },
})

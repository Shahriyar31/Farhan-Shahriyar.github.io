import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://Shahriyar31.github.io",
  base: "/Farhan-Shahriyar.github.io",
  integrations: [tailwind()]
});
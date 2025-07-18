import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // The `site` property should be the full URL of your project.
  site: "https://Shahriyar31.github.io/Farhan-Shahriyar.github.io",
  // The `base` property should be the name of your repository.
  base: "/Farhan-Shahriyar.github.io/", 
  integrations: [tailwind()]
});
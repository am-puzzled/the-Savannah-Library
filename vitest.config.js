import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",

  exclude: [
      "E2E-Tests/**",
      "node_modules/**",
  ],
  },
});
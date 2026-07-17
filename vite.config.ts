import { defineConfig, type Plugin } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

function figmaAssetResolver(): Plugin {
  return {
    name: "figma-asset-resolver",
    resolveId(id: string) {
      if (id.startsWith("figma:asset/")) {
        const filename = id.replace("figma:asset/", "");
        return path.resolve(__dirname, "src/assets", filename);
      }
    },
  };
}

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/wedding-site/" : "/",
  plugins: [figmaAssetResolver(), react()],
  resolve: {
    alias: {
      // Alias @ to the src directory
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ["**/*.svg", "**/*.csv"],
});

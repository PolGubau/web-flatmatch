import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import oxlintPlugin from 'vite-plugin-oxlint'

export default defineConfig({
  plugins: [oxlintPlugin(), tailwindcss(), reactRouter(), tsconfigPaths()],
});

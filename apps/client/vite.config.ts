import { reactRouter } from "@react-router/dev/vite";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";
import crypto from "crypto";
import path from "path";

export default defineConfig(({ mode, isSsrBuild }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      reactRouter(),
      svgr({
        include: "**/*.svg?react",
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@root": path.resolve(__dirname, "./"),
        "@appConfig": path.resolve(__dirname, "./appConfig.d.ts"),
      },
    },
    css: {
      modules: {
        generateScopedName: (className, filePath) => {
          const fileName = path.basename(filePath, ".module.scss");
          const hash = crypto
            .createHash("sha256")
            .update(filePath.concat(className))
            .digest("hex")
            .substring(0, 5);
          return `${fileName}__${className}__${hash}`;
        },
      },
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          silenceDeprecations: ["import"],
          loadPaths: ["src/presentation/shared/styles"],
        },
      },
    },
    preview: {
      port: parseInt(env.VITE_APP_PROD_PORT),
      allowedHosts: ["teremok.unsaved11testing.ru"],
    },
    build: {
      rollupOptions: isSsrBuild ? { input: "./server/app.ts" } : undefined,
    },
  };
});

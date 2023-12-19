import { defineConfig } from "vite";
import pluginVue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";
import viteDts from "vite-plugin-dts";
import * as path from "path";

export default defineConfig({
  plugins: [
    pluginVue(),
    VueJsx(),
    viteDts({
      insertTypesEntry: true,
      staticImport: true,
    }),
    viteDts({
      outDir: "./lib",
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "./src/index.ts"),
      name: "kt-design",
      fileName: (format) => `kt-design.${format}.js`,
    },
    outDir: path.resolve(__dirname, "./es"),
    rollupOptions: {
      external: ["vue"],
      input: [path.resolve(__dirname, "./src/index.ts")],
      output: [
        {
          format: "es",
          //不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: "[name].js",
          //让打包目录和我们目录对应
          preserveModules: true,
          //配置打包根目录
          dir: "es",
          preserveModulesRoot: "src",
        },
        {
          format: "cjs",
          entryFileNames: "[name].js",
          //让打包目录和我们目录对应
          preserveModules: true,
          //配置打包根目录
          dir: "lib",
          preserveModulesRoot: "src",
        },
        // {
        //   globals: {
        //     vue: "Vue",
        //   },
        // },
      ],
    },
  },
});

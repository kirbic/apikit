import typescript from "@rollup/plugin-typescript";
import multi from "@rollup/plugin-multi-entry";

export default {
  input: ["src/api.ts", "src/cli.ts", "src/kit.ts"],
  output: {
    dir: "./dist",
    format: "esm",
  },
  plugins: [typescript()],
};

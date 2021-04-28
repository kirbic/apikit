import typescript from "@rollup/plugin-typescript";

export default {
  input: ["src/api.ts", "src/cli.ts", "src/kit.ts"],
  output: {
    dir: "./dist",
    format: "cjs",
  },
  plugins: [typescript({ target: "es5" })],
};

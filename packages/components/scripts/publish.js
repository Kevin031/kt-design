import path from "path";
import gulp from "gulp";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { rimraf } from "rimraf";

const run = async (command, path) => {
  const [cmd, ...args] = command.split(" ");
  return new Promise((resolve, reject) => {
    const app = spawn(cmd, args, {
      cwd: path, //执行命令的路径
      stdio: "inherit", //输出共享给父进程
      // shell: true, //mac不需要开启，windows下git base需要开启支持
    });
    app.on("close", resolve);
  });
};

const { parallel, series } = gulp;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourcePath = path.resolve(__dirname, "../");
const targetPath = path.resolve(__dirname, "../dist");

const publish = async () => {
  await run("pnpm version patch", `${sourcePath}/transitpkg`);
  await run("mv");
  await run("npm pack", `${targetPath}`);
};

export default series(async () => publish());

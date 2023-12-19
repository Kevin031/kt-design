import path from "path";
import gulp from "gulp";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { rimraf } from "rimraf";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourcePath = path.resolve(__dirname, "../");
const targetPath = path.resolve(__dirname, "../dist");

const { parallel, series } = gulp;

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

const pkgPath = path.resolve(__dirname, "../");

const deleteFolder = (path) => {
  return rimraf(path, {
    sync: true,
  });
};

const removeFiles = () => {
  deleteFolder(`${sourcePath}/es`);
  deleteFolder(`${sourcePath}/lib`);
  deleteFolder(targetPath);
};

const createDist = () => {
  return gulp
    .src(`${sourcePath}/transitpkg/**/*`)
    .pipe(gulp.dest(`${targetPath}`));
};

const buildComponent = async () => {
  return run("pnpm run build", pkgPath);
};

const moveEsComponent = () => {
  console.log("${sourcePath}/es/**/*", `${sourcePath}/es/**/*`);
  return gulp.src(`${sourcePath}/es/**/*`).pipe(gulp.dest(`${targetPath}/es`));
};

const moveLibComponent = () => {
  return gulp
    .src(`${sourcePath}/lib/**/*`)
    .pipe(gulp.dest(`${targetPath}/lib`));
};

const moveStyles = () => {
  return gulp
    .src(`${sourcePath}/styles/**/*`)
    .pipe(gulp.dest(`${targetPath}/styles`));
};

export default series(
  async () => removeFiles(),
  async () => createDist(),
  parallel(async () => buildComponent()),
  parallel(
    async () => moveEsComponent(),
    async () => moveLibComponent(),
    async () => moveStyles()
  )
);

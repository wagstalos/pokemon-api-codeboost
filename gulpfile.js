const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

// Compilando o sass, adicionando autoprefixed e dando refresh na pagina
function compilaSass() {
  return gulp
    .src("scss/*.scss")
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(gulp.dest("css/"))
    .pipe(browserSync.stream());
}
// tarefa do sass
gulp.task("sass", compilaSass);

function pluginsCSS() {
  return gulp
    .src("css/lib/*.css")
    .pipe(concat("plugins.css"))
    .pipe(gulp.dest("css/"))
    .pipe(browserSync.stream());
}

gulp.task("plugincss", pluginsCSS);

function gulpJs() {
  return gulp
    .src("js/scripts/*.js")
    .pipe(concat("all.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("js/"))
    .pipe(browserSync.stream());
}
gulp.task("alljs", gulpJs);

function pluginsJs() {
  return gulp
    .src(["./js/lib/axios.min.js", "./js/lib/swiper.min.js"])
    .pipe(concat("plugins.js"))
    .pipe(gulp.dest("js/"))
    .pipe(browserSync.stream());
}

gulp.task("pluginjs", pluginsJs);

// funcao do browsersync
function browser() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
}
//tarefa do browsersync
gulp.task("browser-sync", browser);

//funcao do watch para alteracoes em scss e html
function watch() {
  gulp.watch("scss/*.scss", compilaSass);

  gulp.watch("css/lib/*.css", pluginsCSS);

  gulp.watch("*.html").on("change", browserSync.reload);

  gulp.watch("js/scripts/*js", gulpJs);

  gulp.watch("js/lib/*.js", pluginsJs);
}
//tarefa do watch
gulp.task("watch", watch);

// tarefas default que executa o watch e o browsersync
gulp.task(
  "default",
  gulp.parallel(
    "watch",
    "browser-sync",
    "sass",
    "plugincss",
    "alljs",
    "pluginjs"
  )
);

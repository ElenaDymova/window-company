"use strict";

//модули кот стребуются при сборке
const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");

//путь куда будем это все кампилировать
const dist = "./dist/";


//отслеживает изменения в HtML файле
gulp.task("copy-html", () => {
  //адрес файла
  return gulp.src("./src/index.html")
    //перемещаем в папку dist
    .pipe(gulp.dest(dist))
    //запускаем browsersync для перезагрузки страницы
    .pipe(browsersync.stream());
});

//кампиляция скриптов
gulp.task("build-js", () => {
  return gulp.src("./src/js/main.js")
    //берем файл main.js и запускаем на нем webpack
    .pipe(webpack({
      mode: 'development', //режим разработки
      output: { //куда будет складываться
        filename: 'script.js'
      },
      watch: false, //параметр watch отключаем, так как за это будт отвечать отдельная задача
      devtool: "source-map", //карта проекта
      module: { //подключаем модуль babel
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', {
                  debug: true, //покажет ошибку в консоли
                  corejs: 3, //библиотека, кот подключает полифилы
                  useBuiltIns: "usage"
                }]]
              }
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest(dist)) //берем полченный файл и отправляем в папку dist
    .on("end", browsersync.reload); //перезагрузка страницы
});

//отслеживает изменения в любых файлах в любой папке и обновлят страницу
gulp.task("copy-assets", () => {
  return gulp.src("./src/assets/**/*.*")
    .pipe(gulp.dest(dist + "/assets"))
    .on("end", browsersync.reload);
});

//запускает сервер
gulp.task("watch", () => {
  browsersync.init({
    server: "./dist/",
    port: 4000,
    notify: true
  });

  //gulp следит за изменением отдельных файлов
  //при обнаружении изменений в файлах запускает команды
  gulp.watch("./src/index.html", gulp.parallel("copy-html"));
  gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
  gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

//запускает параллельно все 3 задачи
gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-js"));

//задача кот нужна в конце проекта
//чистовой вариант
gulp.task("build-prod-js", () => {
  return gulp.src("./src/js/main.js")
    .pipe(webpack({
      mode: 'production',
      output: {
        filename: 'script.js'
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', {
                  corejs: 3,
                  useBuiltIns: "usage"
                }]]
              }
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest(dist));
});

//задача, кот запускаетя по умолчанию (gulp)
//запувкает  команды build (для того чтобы скомпилировались все наши файлы кот возможно изменились до запуска галпа)
//watch (для того чтобы мы могли отслеживать все изменения в будущем)
gulp.task("default", gulp.parallel("watch", "build"));
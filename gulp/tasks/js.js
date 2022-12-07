import webpack from "webpack-stream";  //Для сборки модулей js  npm i -D webpack webpack-stream

export const js = ()=> {
    return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev /* Карта исходников Для получения имени файла при ошибке только в режиме разработчика*/ })
        .pipe(app.plugins.plumber( // Обработка ошибок
            app.plugins.notify.onError({ // Вывод сообщения
                title: "JS",
                message: "Error: <%= error.message %>"
            })))

        .pipe(webpack({
            mode: app.isBuild ? 'production' : 'development', // Если в режиме 'production' продакшена иначе 'development'
            output: {
                filename: 'app.min.js'
            }
        }))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browsersync.stream()); // Обновление браузера
}
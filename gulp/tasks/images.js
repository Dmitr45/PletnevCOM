import webp from "gulp-webp"; // для смены расширения картинок на webp
import imagemin from "gulp-imagemin"; // для сжатия картинок
// npm i -D gulp-webp gulp-imagemin

export const images = ()=>{
    return app.gulp.src(app.path.src.images)
        .pipe(app.plugins.plumber( // Обработка ошибок
            app.plugins.notify.onError({ // Вывод сообщения
                title: "CSS",
                message: "Error: <%= error.message %>"
            })))
        .pipe(app.plugins.newer(app.path.build.images)) // проверяем есть ли обновленные


        .pipe(app.plugins.if(app.isBuild, // Если режим продакшена то
            webp()) )// Меняем формат на webp

        .pipe(app.plugins.if(app.isBuild, // Если режим продакшена то
            app.gulp.dest(app.path.build.images))) // выгружаем в папку с результатом

        .pipe(app.plugins.if(app.isBuild, // Если режим продакшена то
            app.gulp.src(app.path.src.images)))  // смотрим в папку с исходниками

        .pipe(app.plugins.if(app.isBuild, // Если режим продакшена то
            app.plugins.newer(app.path.build.images))) // проверяем есть ли обновленные

        .pipe(app.plugins.if(app.isBuild, // Если режим продакшена то
            imagemin({  // Сжимаем картинки
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true,
            optimizationLevel: 3 // 0 to 7
        })))

        .pipe(app.gulp.dest(app.path.build.images)) // выгружаем сжатые картинки
        .pipe(app.gulp.src(app.path.src.svg)) // получаем доступ к svg
        .pipe(app.gulp.dest(app.path.build.images)) // крпируем svg в папку img
}
import gulpSvgSprite from "gulp-svg-sprite";  // Для создания шрифтового спрайта svg

export const svgSprite = ()=> {
    return app.gulp.src(app.path.src.svgicons, {})
        .pipe(app.plugins.plumber( // Обработка ошибок
            app.plugins.notify.onError({ // Вывод сообщения
                title: "SVG Sprite",
                message: "Error: <%= error.message %>"
            })))
        .pipe(gulpSvgSprite({
            mode: {
                stack:{
                    sprite: '../icons/icons.svg',
                    // Создать страницу с перечнем иконок
                    example: true
                }
            }
        }))
        .pipe(app.gulp.dest(app.path.build.images))
        .pipe(app.plugins.browsersync.stream()); // Обновление браузера
}
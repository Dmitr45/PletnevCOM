import fileInclude from "gulp-file-include"; // плагин для сборки кусков html  npm i -D gulp-file-include
import versionNumber from "gulp-version-number"; // Для автоматического добавления в имя файла ключ. Чтобы не было проблем с кешированием
import webpHtmlNosvg from "gulp-webp-html-nosvg"; // Для оберькт картинок и подключения картинок в форм webp  npm i -D gulp-webp-html-nosvg

export const html = ()=>{
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber( // Обработка ошибок
            app.plugins.notify.onError({ // Вывод сообщения
                title: "HTML",
                message: "Error: <%= error.message %>"
            })))
        .pipe(fileInclude()) // Вызываем для сборки кусков в один файл
        .pipe(app.plugins.replace(/@img\//g, 'img/')) // Меняем @img на 'img/'


        .pipe(
            app.plugins.if(app.isBuild, // Если режим продакшена то
            webpHtmlNosvg()))      // то выводим картинки в webp формате

        .pipe(
            app.plugins.if(app.isBuild, // Если режим продакшена то
        versionNumber({ // К адресу наших css и js подставляем дату
            'value': '%DT%',
            'append': {
                'key' : '_v',
                'cover': 0,
                'to': [
                    'css',
                    'js',
                ]
            },
            'output': {
                'file': 'gulp/version.json'
            }
        }))
    )
        .pipe(app.gulp.dest(app.path.build.html)) // Переносим модифицированные файлы html в dest
       .pipe(app.plugins.browsersync.stream()); // Обновление браузера
}

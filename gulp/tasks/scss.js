import dartSass from 'sass'; // Препроцессор SASS
import gulpSass from 'gulp-sass'; // Для запуска препроцессора
// npm i -D sass gulp-sass
import rename from 'gulp-rename'; //для переименования файлов

import cleanCss from 'gulp-clean-css'; // Сжатие css файла
import webpcss from 'gulp-webpcss';  // вывод WEBP изображений
import autoprefixer from 'gulp-autoprefixer'; // Добавляет префиксы для кроссбраузерности
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Группировка медиазапросов
//npm i -D gulp-clean-css gulp-webpcss gulp-autoprefixer gulp-group-css-media-queries



const sass = gulpSass(dartSass);

export const scss = ()=>{
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev /* Карта исходников Для получения имени файла при ошибке только в режиме разработчика*/ })
        .pipe(app.plugins.plumber( // Обработка ошибок
            app.plugins.notify.onError({ // Вывод сообщения
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })))
        .pipe(app.plugins.replace(/@img\//g, '../img/')) // Меняем @img на 'img/'
        .pipe(sass({ //компилируем код scss->css
            outputStyle: 'expanded' //можно установить сжимать css или нет
        }))
        .pipe(app.plugins.if(app.isBuild, // Если режим продакшена то
            groupCssMediaQueries()) ) // Сгруппируем Media

        .pipe(app.plugins.if(app.isBuild, // Если режим продакшена то
            webpcss({   // Подгрузим картинки .webp только если у HTML будет класс .webp
            webpClass: ".webp",
            noWebpClass: ".no-webp" // Иначе подгрузим исходные форматы jpg, jpeg, и т.д.
        })))

        .pipe(app.plugins.if(app.isBuild, // Если режим продакшена то
            autoprefixer({ // Кросбраузерность
            grid: true,
            overrideBrowserslist: ["last 3 versions"], // 3 последних версии
            cascade: true
        })))

        .pipe(app.gulp.dest(app.path.build.css)) // Выгружаем не сжатую версию

        .pipe(cleanCss()) // Ужмем CSS
        .pipe(rename({ //переименуем style.scss в slyle.min.css
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.build.css)) //Выгружаем сжатую переименованную версию
        .pipe(app.plugins.browsersync.stream()); // Обновление браузера
}
// Основной модуль
import gulp from "gulp";
//Импорт путей
import { path } from "./gulp/config/path.js";
// Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";

//  Передаем значения в глобальную переменную
global.app = {
    isBuild: process.argv.includes('--build'), // Переменная режима продакшен (argv хранит флаг --build )
    isDev: !process.argv.includes('--build'),  // Переменная режима разработчика (argv не хранит флаг --build )
    path: path,
    gulp: gulp,
    plugins: plugins,
}

// Импорт задач
import  { copy_files } from "./gulp/tasks/copy.js";
import  { scss } from "./gulp/tasks/scss.js";
import  { reset } from "./gulp/tasks/reset.js"
import { html } from "./gulp/tasks/html.js"
import { js } from "./gulp/tasks/js.js"
import { images } from "./gulp/tasks/images.js"
import {otfToTff, ttfToWoff, fontsStyle} from "./gulp/tasks/fonts.js";
import { server } from "./gulp/tasks/server.js";
import { svgSprite } from "./gulp/tasks/svgSprite.js";


//Наблюдаем за изменениями в файлах
function watcher(){
    gulp.watch(path.watch.files, copy_files); // наблюдает за изменениями в файлах папке files, при появлении нового запускает copy
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.html, html); // наблюдает за изменениями в html файлах папки html
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images());
}

export {svgSprite} // для использования внесли запись в package.json запись  "scripts": { "svgSprite": "gulp svgSprite"},
// Вызываем запус с помощью консоли:   npm run svgSprite

// Построение сценариев выполнения задач
const fonts = gulp.series(otfToTff, ttfToWoff, fontsStyle);
const mainTasks = gulp.series(fonts, gulp.parallel( copy_files, scss, html, js, images)); // Метод parallel выполняется паралельно
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server)); // Для режима разработчика,  Метод siries выполняет задачи последовательно
const build = gulp.series(reset, mainTasks); // Для режима продакшене не запускаем сервер и не следим за изменением файлов

// Экспорт сценариев
export { dev }  // Запуск в режиме разработчика: npm run dev
export { build }// Запуск в режиме продакшен: npm run build


// Выполнение задачи
gulp.task('default', dev);
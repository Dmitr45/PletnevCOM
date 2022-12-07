import replace from "gulp-replace";  // Плагин "Поиск и замена" npm i -D gulp-replace
import plumber from "gulp-plumber"; // Обработка ошибок
import notify from "gulp-notify"; // Сщщищения (подсказки) в Виндоус
import newer from "gulp-newer"; // Проверка обновления
import browsersync from "browser-sync"; // Управление браузером(самообновление страницы например)//npm install -D browser-sync
import ifPlugin from "gulp-if"; //Условное ветвление npm i -D gulp-if


// Экспортируем все подключенные плагины в объект
export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    newer: newer,
    browsersync: browsersync,
    if: ifPlugin
}
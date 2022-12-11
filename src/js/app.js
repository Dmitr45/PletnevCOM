import {DateTime} from "./modules/functions.js";
import * as flsFunctions from "./modules/functions.js";
import {NowYear}  from "./modules/functions.js";

//import * as mobMenuActive from "./modules/functions.js";
//import * as TextEypeWriter from "./modules/functions.js";
//import * as BtnExp  from "./modules/functions.js";


// Бургер меню
//obMenuActive();

// Анимация кнопок резюме
flsFunctions.Btn('#hello__btn');
flsFunctions.Btn('#hello__btn__rus');

// Выводим картинки в виде webp
flsFunctions.isWebP();

// Текущий год в футере копирайт
let item = document.querySelector("#copy_year").innerHTML = NowYear;

// Выводим элюзию написания кода функции
//flsFunctions.TextEypeWriter();

// Подключаем кнопку UP
flsFunctions.ButtonScrollUp('#up', 0);

// Форма обратной связи с отправкой в телеграм
flsFunctions.TelegramMessage();



console.log('main.js подгружен');



/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
export function  isWebP() {
    function testWebP(callback) {
        // Проверка поддержки  webp
        var webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
        // Добавление соответствующего класса для HTML
    testWebP(function (support) {

        if (support == true) {
            document.querySelector('html').classList.add('webp');
        } else {
            document.querySelector('html').classList.add('no-webp');
        }
    });
}

export function mobMenuActive() {
    let btm = document.querySelector("#icon-menu")
    btm.onclick = () => {
        console.log("Вы нажали на бургер меню");
        document.getElementById("menu__body").classList.toggle("_active");
        document.getElementById("icon-menu").classList.toggle("_active");
    }
    let linkMenu = document.querySelector("#menu-list");
    linkMenu.onclick = () => {
        console.log("Вы нажали ссылку меню");
        document.getElementById("menu__body").classList.remove("_active");
        document.getElementById("icon-menu").classList.remove("_active");
    }
}
mobMenuActive();

//Скрипт оправки сообщений из формы. Воспользуемся ботом телеграм для отправки сообщений 
//https://www.youtube.com/watch?v=RviYQrNdDok
//https://tlgrm.ru/docs/bots/api  sendMessage
//https://www.npmjs.com/package/axios Используем для отправки сообщений $ npm install axios
import axios from 'axios';
export function TelegramMessage(){
    const TOKEN = "5698301113:AAFrSfVgJo33K6n_VzDmQMlbgtfiQ91F8vY";
    const CHAT_ID = "-1001807784586";
    const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    const URI_API_DOC = `https://api.telegram.org/bot${TOKEN}/sendDocument`;
    const success = document.querySelector('#success') 

    // БОТ  PletnevdComSEND PletnevdComSEND_bot Use this token to access the HTTP API: 5698301113:AAFrSfVgJo33K6n_VzDmQMlbgtfiQ91F8vY
document.querySelector('#tg').addEventListener('submit', function(e) {
        e.preventDefault(); // Обнулили стандартное действие формы
        
        let massage  = `<b> Сообщение с сайта pletnevd.com</b> \n`
        massage += `<b> Отправитель: </b> ${this.InputName.value} \n`
        massage += `<b> Телефон: </b> ${this.InputTel.value} \n`
        massage += `<b> Сообщение: </b>${this.InputText.value}`

        let formData = new FormData();
        formData.append('chat_id', CHAT_ID)
        formData.append('document', this.InputFile.files[0])

        
        axios.post(URI_API_DOC,  formData, {
            headers: { 'Content-Type' : 'multipart/form-data' }
            })

        axios.post(URI_API, {  // Первый параметр куда отправляем, второй - объект
            chat_id:  CHAT_ID, 
            parse_mode: 'html',
            text: massage
        }) 
        .then((res) => {
            this.InputName.value = "";
            this.InputTel.value = "";
            this.InputText.value = "";
            success.innerHTML = "Message sent!";
            success.style.opacity = '1';
        })
        .catch((err) =>{
            console.warn(err);
        })
        .finally(() =>{ console.log("TelegramMessage end") })
        console.log(massage);
})

//document.querySelector('#link_contact').addEventListener("click", (e) =>{
//    document.querySelector('#SendMessage').classList.toggle('hiden');
//} )


} 






function DateTime(){
        let now = new Date();
        let nowYear = now.getFullYear();
        let nowMonth = now.getMonth();
        let nowDate = now.getDate();
        let nowHours = now.getHours();
        // let nowMin = getMinutes();
        //let nowSec = getSeconds();
        //getMilliseconds()
        return {
            "NowYear": nowYear,
            "NowMonth": nowMonth,
            "NowDay": nowDate
        }

}
//export let NowYear = document.querySelector("#copy_year").innerHTML = DateTime().NowYear;
export let NowYear = DateTime().NowYear;


// Эфект загрузки при нажаптии на кнопку с клпссом button
export function Btn(SelectorBtn){
    var b = document.querySelector(SelectorBtn);
    b.onclick = function (e) {
        b.className = "btn load";
        b.innerHTML = "";
        setTimeout(function () {
            b.className = "btn";
            b.innerHTML = "<b>Спасибо</b>";
            //window.location.href = 'https://novosibirsk.hh.ru/resume/a5b4f25fff093f30880039ed1f587741624d46';
            window.open('http://pletnevhost.ru/');
        }, 3000);
    }
}


// Функция вывода текста побуквенно
export function TextEypeWriter(selector='#text_EypeWriter', text="write default text", speed=100) {
    var ele = document.querySelector(selector),
        txt = text.join("").split("");

    var interval = setInterval(function(){

        if(!txt[0]){

            return clearInterval(interval);
        }
        ele.innerHTML += txt.shift();
    }, speed);
    return false;
}

// Функция кнопки UP
export function ButtonScrollUp(selector, delay=20) {
    document.querySelector("html").style.scrollBehavior = "smooth"; // Добавляем стиль к html замедления прокрутки
    const up = document.querySelector(selector);
    up.style.display = "none";
    document.addEventListener("scroll", ()=> {(scrollY*2 > document.documentElement.clientHeight) ? (up.style.display = "block") : (up.style.display = "none")})
    up.onclick = ()=> { window.scrollTo(scrollY, 0);   console.log("UP"); }
}


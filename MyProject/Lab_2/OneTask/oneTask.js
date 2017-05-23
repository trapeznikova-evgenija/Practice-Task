var message = prompt("Введите ваше сообщение", " ");
message = message.toLowerCase();

if (~message.indexOf("черт побери")) {
  alert("Подскользнулся, упал. Очнулся - гипс");
} else {
  alert("Я вас не понимаю");
}
var userName, password;

userName = prompt('Введите ваш логин', '');
if (userName == 'Админ') {
  password = prompt('Ваш пароль', '');
  if (password == 'Черный Властелин') {
    alert('Добро пожаловать!');
  } else if (password == null) {
    alert('Вход отменен');
  } else {
    alert('Пароль неверен');
  }
} else if (userName == null) {
  alert('Вход отменен');
} else {
  alert('Я вас не знаю');
}
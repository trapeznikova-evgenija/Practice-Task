var audioContext; // контекст аудио
var buf; // аудиобуфер

// инициализация звуковой системы
function init() {
  try {
    audioContext = new AudioContext();
    loadFile("sound/pacmanBeginning.wav");
  } catch(error) {
    alert('you need webaudio support'); // возможность обработки ошибки
  }
}
window.addEventListener('load',init,false);

// загружаем и декодируем mp3-файл
function loadFile(url) {
  var request = new XMLHttpRequest();
  request.open("GET",url, true);
  request.responseType = "arraybuffer";
  request.onload = function() {
    // декодируем загруженные данные
    audioContext.decodeAudioData(request.response, function (buffer) {
      buf = buffer;
      play();
    });
  };
  request.send();
}

// воспроизведение загруженного файла
function play() {
  // создаём исходный узел из буфера
  var src = audioContext.createBufferSource();
  src.buffer = buf;
  // подключаемся к выходному узлу (колонкам)
  src.connect(audioContext.destination);
  // сразу воспроизводим
  src.start(0);
}
var userMessage = prompt("Введите сообщение для форума", "");
userMessage = userMessage.toLowerCase();
var numberOfWords = userMessage.split(" ").length;

console.log(userMessage);
moderateMessage(userMessage);

function moderateMessage(userMessage) {

  var prohibitedWords = ["аппроксимация", "зуб", "лиса", "лебедь", "рак", "щука"];
  var numberOfProhibitedWords = prohibitedWords.length;
  var i = 0;
  while (i < numberOfWords) {

    for (var k = 0; k < numberOfProhibitedWords; k++) {
      var Target = prohibitedWords[k];
      var lenTarget = Target.length;
      userMessage = userMessage.replace(Target, "*".repeat(lenTarget));
    }
    i++
  }
  alert(userMessage);
}






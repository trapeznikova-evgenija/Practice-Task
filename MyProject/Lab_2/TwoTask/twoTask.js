var userMessage = prompt("Введите сообщение для форума", "");

console.log(userMessage);
moderateMessage(userMessage);

function moderateMessage(userMessage) {

  var prohibitedWords = ["аппроксимация", "зуб", "лиса", "лебедь", "рак", "щука"];
  var numberOfBadWords = prohibitedWords.length;
  
  var i = 0;
  while (i < numberOfBadWords) {
    
    var target = new RegExp(prohibitedWords[i], "ig");
    userMessage = userMessage.replace(target, "*****");
    i++;
    
  }
  console.log(userMessage);
}



/*function moderateMessage(userMessageArr) {
 var prohibitedWords = ["аппроксимация", "зуб", "лиса", "лебедь", "рак", "щука"];
 var numberOfWords = userMessageArr.length;

 for (var i = 0; i < numberOfWords + 1; i++) {
 var positionInMessage = prohibitedWords.indexOf(userMessageArr[i]);
 var nameLengths = prohibitedWords.map(function(name) {
 return name.length;
 });
 console.log(nameLengths);
 if (positionInMessage != -1) {
 while (nameLengths[positionInMessage] != 0) {
 userMessageArr[i] = '*' + userMessageArr[i]; 
 nameLengths[positionInMessage]--; 
 }
 userMessageArr[i] = prohibitedWords[positionInMessage];


 }

 }
 alert(userMessageArr);
 } */

/*function moderateMessage(userMessage) {

 var prohibitedWords = ["аппроксимация", "зуб", "лиса", "лебедь", "рак", "щука"];
 console.log(userMessage);
 var numberOfWords = userMessage.length;
 console.log(numberOfWords);
 var target = prohibitedWords[0];
 target = prohibitedWords[0].toLowerCase();
 console.log(target);

 var pos = 0;   //поиск всех вхождение target
 while (true) {
 var foundPos = userMessage.indexOf(target, pos);

 if (foundPos == -1) break;

 alert(foundPos);
 pos = foundPos + 1;
 }
 } */
var vasya = { name: "Вася", age: 23 };
var masha = { name: "Маша", age: 18 };
var vovochka = { name: "Вовочка", age: 6 };
var people = [ vasya, masha, vovochka ];

people.sort(compareNumeric);
var numberOfPeople = people.length;
for (var i = 0; i < numberOfPeople; i++) {
  console.log(people[i].name);
}

function compareNumeric(firstPeople, secondPeople) {
  if (firstPeople.age > secondPeople.age) return 1;
  if (firstPeople.age < secondPeople.age) return -1;
}

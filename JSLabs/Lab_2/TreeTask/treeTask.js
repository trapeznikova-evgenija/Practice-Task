var uncleFedor = {
  name: "Фёдор",
  age: 16,
  education: true,
  dog: {
    name: "Шарик",
    colour: "brown"
  }
};

var cat = {
  name: "Матроскин",
  age: 4,
  "умеет разговаривать": true
};

uncleFedor.cat = cat;
console.log(uncleFedor);

cat.name = "Не Матроскин";
console.log(uncleFedor);
const person = {
  firstName: "Vika",
  lastName: "Kiselova",
  age: 31,
};

person.email = "testaqa@gmail.com";
delete person.age;

console.log(person);

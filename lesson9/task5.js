const users = [
  {
    name: "Vika",
    email: "test1@gmail.com",
    isUnemployed: true,
  },
  {
    name: "Tanya",
    email: "test2@gmail.com",
    isUnemployed: false,
  },
  {
    name: "Oleg",
    email: "test3@gmail.com",
    isUnemployed: false,
  },
  {
    name: "Kyrylo",
    email: "test4@gmail.com",
    isUnemployed: true,
  },
];

for (const { name, email, isUnemployed } of users) {
  console.log(name);
  console.log(email);
  console.log(isUnemployed);
}

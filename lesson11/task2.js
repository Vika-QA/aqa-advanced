// TODOS
const fetchTodo = async (id) => {
  return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed, status code: " + response.status);
      }
      return response.json();
    })
    .then((todo) => {
      console.log("fetchTodo: ", todo);
      return todo;
    })
    .catch((error) => {
      console.error(error);
    });
};
// fetchTodo(1);

// USERS
const fetchUser = async (id) => {
  return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed, status code: " + response.status);
      }
      return response.json();
    })
    .then((user) => {
      console.log("fetchUser: ", user);
      return user;
    })
    .catch((error) => {
      console.error(error);
    });
};
// fetchUser(1);

// PROMISE ALL
const fetchPromiseAll = Promise.all([fetchTodo(2), fetchUser(2)])
  .then(([todo, user]) => {
    console.log("PROMISE ALL, todo: ", todo);
    console.log("PROMISE ALL, user: ", user);
  })
  .catch((err) => console.log(err));

// PROMISE RACE
const fetchPromiseRace = Promise.race([fetchTodo(2), fetchUser(2)])
  .then((todoOrUser) => {
    console.log("PROMISE RACE, todo or user: ", todoOrUser);
  })
  .catch((err) => console.log(err));

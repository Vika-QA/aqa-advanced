// TODOS
const fetchTodo = async () => {
  return fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Failed internet connection, status code: " + response.status
        );
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
// fetchTodo();

// USERS
const fetchUser = async () => {
  return fetch("https://jsonplaceholder.typicode.com/users/1")
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Failed internet connection, status code: " + response.status
        );
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
// fetchUser();

// PROMISE ALL
const fetchPromiseAll = Promise.all([fetchTodo(), fetchUser()])
  .then(([todo, user]) => {
    console.log("PROMISE ALL, todo: ", todo);
    console.log("PROMISE ALL, user: ", user);
  })
  .catch((err) => console.log(err));

// PROMISE RACE
const fetchPromiseRace = Promise.race([fetchTodo(), fetchUser()])
  .then((todoOrUser) => {
    console.log("PROMISE RACE, todo or user: ", todoOrUser);
  })
  .catch((err) => console.log(err));

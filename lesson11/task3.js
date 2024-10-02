// TODO
const fetchTodo = async (id) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );

    if (!response.ok) {
      throw new Error("Failed, status code: " + response.status);
    }

    const todo = await response.json();

    console.log(todo);
    return todo;
  } catch (error) {
    console.log(error);
  }
};

// USER
const fetchUser = async (id) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    if (!response.ok) {
      throw new Error("Failed, status code: " + response.status);
    }

    const user = await response.json();

    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
  }
};

// PROMISE ALL
const fetchPromiseAll = async () => {
  try {
    const [todo, user] = await Promise.all([fetchTodo(3), fetchUser(3)]);
    console.log("PROMISE ALL, todo: ", todo);
    console.log("PROMISE ALL, user: ", user);
  } catch (err) {
    console.log(err);
  }
};
fetchPromiseAll();

// PROMISE RACE
const fetchPromiseRace = async () => {
  try {
    const todoOrUser = await Promise.race([fetchTodo(3), fetchUser(3)]);
    console.log("PROMISE RACE, todo or user: ", todoOrUser);
  } catch (err) {
    console.log(err);
  }
};
fetchPromiseRace();

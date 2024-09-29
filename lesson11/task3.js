// TODO
const fetchTodo = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );

    if (!response.ok) {
      throw new Error(
        "Failed internet connection, status code: " + response.status
      );
    }

    const todo = await response.json();

    console.log(await todo);
    return todo;
  } catch (error) {
    console.log(error);
  }
};

// USER
const fetchUser = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );

    if (!response.ok) {
      throw new Error(
        "Failed internet connection, status code: " + response.status
      );
    }

    const user = await response.json();

    console.log(await user);
    return user;
  } catch (error) {
    console.log(error);
  }
};

// PROMISE ALL
const fetchPromiseAll = async () => {
  try {
    const [todo, user] = await Promise.all([fetchTodo(), fetchUser()]);
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
    const todoOrUser = await Promise.race([fetchTodo(), fetchUser()]);
    console.log("PROMISE RACE, todo or user: ", todoOrUser);
  } catch (err) {
    console.log(err);
  }
};
fetchPromiseRace();

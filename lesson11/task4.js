class TodoAndUser {
  async fetchTodo(id) {
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
  }

  async fetchUser(id) {
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
  }
}

class TodoAndUserImproved extends TodoAndUser {
  async fetchPromiseAll() {
    try {
      const [todo, user] = await Promise.all([
        this.fetchTodo(4),
        this.fetchUser(4),
      ]);
      console.log("PROMISE ALL, todo: ", todo);
      console.log("PROMISE ALL, user: ", user);
    } catch (err) {
      console.log(err);
    }
  }

  async fetchPromiseRace() {
    try {
      const todoOrUser = await Promise.race([
        this.fetchTodo(4),
        this.fetchUser(4),
      ]);
      console.log("PROMISE RACE, todo or user: ", todoOrUser);
    } catch (err) {
      console.log(err);
    }
  }
}

const todoAndUserImproved = new TodoAndUserImproved();
todoAndUserImproved.fetchPromiseAll();
todoAndUserImproved.fetchPromiseRace();

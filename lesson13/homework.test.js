import axios from "axios";

const instance = axios.create({
  baseURL: "https://demoqa.com",
});

//POST Request 1 Not Correct data
describe("Checking Users", () => {
  test("[POST Negative test] Create new user", async () => {
    const resp = await instance.post(
      "/Account/v1/User",
      {
        userName: "Vika",
        password: "Qa123123", //not correct password, without special characters
      },
      { validateStatus: () => true }
    );

    console.log(resp.data);
    expect(resp.status).toBe(400);
    expect(resp.data.code).toBe("1300");
    expect(resp.data.message).toMatch("Passwords must have at least");
  });

  //POST Request 2 Correct data
  test("[POST Positive test] Create new user", async () => {
    const userName = "Vika_QA";
    const resp = await instance.post(
      "/Account/v1/User",
      {
        userName: userName,
        password: "Qa123123!",
      },
      { validateStatus: () => true }
    );

    console.log(resp.data);
    expect(resp.status).toBe(201);
    expect(resp.data.userID).toBeDefined();
    expect(resp.data.username).toBe(userName);
    expect(resp.data.books).toBeDefined();
  });
});

//GET Request 3 Check list books. Positive Test
const isbn = "9781449365035"; // hardcode to the third book isbn
describe("Checking books", () => {
  test("[GET Positive test] Check the list of books", async () => {
    const resp = await instance.get("/BookStore/v1/Books", {
      validateStatus: () => true,
    });
    console.log(resp.data.books);
    const books = resp.data.books;
    expect(resp.status).toBe(200);

    books.forEach((book) => {
      expect(book).toHaveProperty("isbn");
      expect(book).toHaveProperty("title");
      expect(book).toHaveProperty("subTitle");
      expect(book).toHaveProperty("author");
      expect(book).toHaveProperty("pages");
      expect(book).toHaveProperty("description");
      expect(book).toHaveProperty("website");
    });

    const bookLength = resp.data.books.length;
    expect(bookLength).toBeGreaterThan(0);
    if (bookLength > 3) {
      const thirdBook = resp.data.books[3];
      console.log(thirdBook);

      expect(thirdBook.isbn).toBe(isbn);
      expect(thirdBook.title).toBe("Speaking JavaScript");
      expect(thirdBook.subTitle).toBe("An In-Depth Guide for Programmers");
      expect(thirdBook.author).toBe("Axel Rauschmayer");
      expect(thirdBook.pages).toBe(460);
      expect(thirdBook.description).toMatch(
        "Like it or not, JavaScript is everywhere these"
      );
    } else {
      console.warn(`Only ${bookLength} books available in the response.`);
    }
  });

  //GET Request 4. Check specific book with ISBN
  test("[GET Positive test] Check specific book", async () => {
    const resp = await instance.get(`/BookStore/v1/Book?ISBN=${isbn}`, {
      validateStatus: () => true,
    });
    const book = resp.data;
    console.log(book);

    expect(resp.status).toBe(200);
    expect(book.isbn).toBe("9781449365035");
    expect(book.title).toBe("Speaking JavaScript");
    expect(book.subTitle).toBe("An In-Depth Guide for Programmers");
    expect(book.author).toBe("Axel Rauschmayer");
    expect(book.author).not.toBe("Vasya Petechkin");
    expect(book.publisher).toBe("O'Reilly Media");
    expect(book.pages).toBe(460);
    expect(book.description).toMatch(/JavaScript is everywhere/);
    expect(book.website).toBe("http://speakingjs.com/");
  });

  //POST Responce 5. Check specific book with not correct ISBN
  test("[GET Negative test] Check specific book ISBN='TEST'", async () => {
    const notCorrectIsbn = "TEST";
    const resp = await instance.get(
      `/BookStore/v1/Book?ISBN=${notCorrectIsbn}`,
      { validateStatus: () => true }
    );
    console.log(resp.data);
    expect(resp.status).toBe(400);
    expect(resp.data.code).toBe("1205");
    expect(resp.data.message).toBe(
      "ISBN supplied is not available in Books Collection!"
    );
  });
});

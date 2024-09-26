import { validateString, validateNumber } from "./validators.mjs";

class Book {
  constructor(title, author, year) {
    this._title = title;
    this._author = author;
    this._year = year;
  }

  printInfo() {
    console.log(
      `Title: ${this._title}, Author: ${this._author}, Year: ${this._year}`
    );
  }

  get title() {
    return this._title;
  }
  set title(value) {
    if (validateString(value)) {
      this._title = value;
    }
  }

  get author() {
    return this._author;
  }
  set author(value) {
    if (validateString(value)) {
      this._author = value;
    }
  }

  get year() {
    return this._year;
  }
  set year(value) {
    if (validateNumber(value)) {
      this._year = value;
    }
  }

  static findTheOldestBook(books) {
    let theOldestBook = books[0];
    books.forEach((book) => {
      if (book.year < theOldestBook.year) {
        theOldestBook = book;
      }
    });
  }
}

export default Book;

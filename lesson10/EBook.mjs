import Book from "./Book.mjs";
import { validateFormat, validateString } from "./validators.mjs";

class EBook extends Book {
  constructor(title, author, year, fileFormat) {
    super(title, author, year);
    this._fileFormat = fileFormat;
  }

  printInfo() {
    super.printInfo();
    console.log(`File format: ${this._fileFormat}`);
  }

  get fileFormat() {
    return this._fileFormat;
  }
  set fileFormat(value) {
    if (validateString(value) && validateFormat(value)) {
      this._fileFormat = value;
    }
  }

  static createEBookFromBook(book, fileFormat) {
    if (book instanceof Book) {
      return new EBook(book.title, book.author, book.year, fileFormat);
    }
  }
}

export default EBook;

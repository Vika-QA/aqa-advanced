import Book from "./Book.mjs";
import EBook from "./EBook.mjs";

// Book
const firstBook = new Book("The Sherlock Holmes", "Arthur Conan Doyle", 1702);
const secondBook = new Book("The Adventures of Tom Sawyer", "Mark Twain", 1876);
const thirdBook = new Book(
  "Harry Potter The prisoner of azkaban",
  "J.Rouling",
  1999
);
firstBook.printInfo();
secondBook.printInfo();
thirdBook.printInfo();

// EBook
const firstEBook = new EBook("Harry Potter", "J.Rouling", 2000, "DOC");
const secondEBook = new EBook("Eneida", "I. Kotliyarevskiy", 1900, "TXT");
const thirdEBook = new EBook("Kobzar", "Taras Shevchenko", 1800, "PDF");
firstEBook.printInfo();
secondEBook.printInfo();
thirdEBook.printInfo();

// Getters (old properties)
console.log(thirdEBook.title);
console.log(thirdEBook.author);
console.log(thirdEBook.year);
console.log(thirdEBook.fileFormat);

// Setters
thirdEBook.title = 15;
thirdEBook.title = "Super Kobzar";
thirdEBook.author = true;
thirdEBook.author = "Super Shevchenko";
thirdEBook.year = "test";
thirdEBook.year = 1840;
thirdEBook.fileFormat = null;
thirdEBook.fileFormat = "DOC";

// Getters (new properties)
console.log(thirdEBook.title);
console.log(thirdEBook.author);
console.log(thirdEBook.year);
console.log(thirdEBook.fileFormat);

// Static method that search the oldest book
Book.findTheOldestBook([
  firstBook,
  secondBook,
  thirdBook,
  firstEBook,
  secondEBook,
  thirdEBook,
]);

// Static method that returns an instance of the EBook class
EBook.createEBookFromBook(secondBook, "TXT");

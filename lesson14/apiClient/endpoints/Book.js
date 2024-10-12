import RestClient from "../restClient/restClients";

export default class Book extends RestClient {
  constructor() {
    super("https://demoqa.com");
    this.url = "/BookStore/v1";
  }
  async checkBookWithISBN(isbn) {
    return this.sendRequest({
      url: `${this.url}/Book/?ISBN=${isbn}`,
      method: "GET",
    });
  }
}

import RestClient from "../restClient/restClients";

export default class CustomHeaders extends RestClient {
  constructor() {
    super("https://httpbin.org");
    this.url = "/get";
  }

  async sendCustomRequest(customHeaders, queryParams) {
    return this.sendRequest({
      url: this.url,
      method: "GET",
      headers: customHeaders,
      params: queryParams,
    });
  }
}

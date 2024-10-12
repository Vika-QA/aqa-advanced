import axios from "axios";

export default class RestClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      validateStatus: () => true,
    });
  }

  async sendRequest({ url, method, data, headers, params, additionalConfigs }) {
    try {
      return await this.axiosInstance.request({
        url,
        method,
        data,
        headers,
        params,
        ...additionalConfigs,
      });
    } catch (err) {
      throw new Error(
        `Error to ${this.baseUrl}${this.url}/ Error stack: ${err.stack}`
      );
    }
  }
}

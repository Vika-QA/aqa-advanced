import Book from "../apiClient/endpoints/Book";
import CustomHeaders from "../apiClient/endpoints/customHeaders";
import { sendInvalidRequest } from "../sendInvalidRequest";

//Task 1, first way to check invalid ISBN
describe("Checking invalid ISBN", () => {
  let bookApi;
  beforeAll(async () => {
    bookApi = new Book();
  });

  test("Invalid ISBN", async () => {
    const resp = await bookApi.checkBookWithISBN(978144936503); // not correct isbn. Correct isbn - 9781449365035
    console.log(resp.data);
    expect(resp.status).toBe(400);
    expect(resp.data.message).toEqual(
      "ISBN supplied is not available in Books Collection!"
    );
    expect(resp.data.code).toBe("1205");
  });
});

//Task 1, another way to check invalid site
describe("Checking invalid request", () => {
  test("Invalid site request", async () => {
    try {
      await sendInvalidRequest("https://invalidesitebooks.com/");
    } catch (error) {
      expect(error.message).toMatch(
        /ERROR from https:\/\/invalidesitebooks.com\//
      );
    }
  });
});

// Task 2, Testing Request Headers and Params
describe("Testing Request Headers and Params", () => {
  let customRequest;
  beforeAll(() => {
    customRequest = new CustomHeaders();
  });
  test("Check custom headers and params", async () => {
    const customHeaders = {
      "Custom-Header": "MyValue",
      "Another-Header": "AnotherValue",
    };

    const queryParams = {
      param1: "value1",
      param2: "value2",
    };

    const response = await customRequest.sendCustomRequest(
      customHeaders,
      queryParams
    );
    console.log(response.data);
    expect(response.status).toBe(200);
    expect(response.data.headers).toMatchObject(customHeaders);
    expect(response.data.args).toMatchObject(queryParams);
  });
});

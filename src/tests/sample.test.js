import someFunction from "../lib/sample";

test("Returns the string 'string'", () => {
  expect(someFunction()).toEqual("string");
});

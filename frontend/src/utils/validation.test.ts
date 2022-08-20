import { isValidHttpUrl, isValidNumber } from "./validations";

it("should be valid URL", () => {
  const url1 =
    "https://res.cloudinary.com/v1624813411/products/transistors_rnpto7.jpg";
  const url2 = "abc.com/dc0uxmplw/image/upload/w_150,h_150,c_fill/v1624";
  const url3 =
    "http://res.cloudinary.com/v1624813411/products/transistors_rnpto7.jpg";

  const result1 = isValidHttpUrl(url1);
  const result2 = isValidHttpUrl(url2);
  const result3 = isValidHttpUrl(url3);

  expect(result1).toEqual(true);
  expect(result2).toEqual(false);
  expect(result3).toEqual(true);
});

it("should be valid number", () => {
  const nb1 = "34";
  const nb2 = "14.58";
  const nb3 = "25,55";
  const nb4 = "at33";

  const result1 = isValidNumber(nb1);
  const result2 = isValidNumber(nb2);
  const result3 = isValidNumber(nb3);
  const result4 = isValidNumber(nb4);

  expect(result1).toEqual(true);
  expect(result2).toEqual(true);
  expect(result3).toEqual(true);
  expect(result4).toEqual(false);
});

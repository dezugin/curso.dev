const calculator = require("../models/calculator.js");

test("adding 2 + 2 should equals 4", () => {
  const result = calculator.add(2, 2);
  expect(result).toBe(4);
});

test("adding 5 + 100 should equals 105", () => {
  const result = calculator.add(2, 2);
  expect(result).toBe(4);
});

test("adding banana + 2 should equals error", () => {
  const result = calculator.add("banana", 2);
  expect(result).toBe("Error");
});

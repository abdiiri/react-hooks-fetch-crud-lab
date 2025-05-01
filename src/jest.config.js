// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"], // Ensure that the setup file is used
  testMatch: ["**/__tests__/**/*.test.js"], // Looks for test files in __tests__ folder
};

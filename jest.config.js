module.exports = {
  testEnvironment: "jsdom", // Ensure jsdom is used as the environment
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest", // Transform JSX/TSX files using Babel
  },
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy", // Mock CSS imports
  },
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect", // Add custom matchers for testing-library
  ],
};

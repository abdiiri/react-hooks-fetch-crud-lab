// jest.config.js
module.exports = {
  testEnvironment: 'jsdom', // You might need this if you're working with React
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // If you're using Babel
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
};

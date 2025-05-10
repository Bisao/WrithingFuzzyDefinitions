
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/game/$1'
  },
  setupFiles: ['<rootDir>/test/setup.js']
};

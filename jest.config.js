/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^tasks/(.*)$': '<rootDir>/src/tasks/$1',
    '^chat/(.*)$': '<rootDir>/src/chat/$1',
    '^users/(.*)$': '<rootDir>/src/users/$1',
    '^common/(.*)$': '<rootDir>/src/common/$1',
  },
};

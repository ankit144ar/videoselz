module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/src/**/*.test.jsx'],
  setupFilesAfterEnv: ['<rootDir>/src/testSetup.cjs'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/src/__mocks__/styleMock.cjs',
    '\\.(gif|jpe?g|png|svg|webp)$': '<rootDir>/src/__mocks__/fileMock.cjs'
  },
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest'
  }
};
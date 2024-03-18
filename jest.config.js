module.exports = {
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", {tsconfig: "test/tsconfig.json"}]
  },
  moduleFileExtensions: ["ts", "js"],
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.ts", "src/**/*.js"],
  testMatch: ["**/*.spec.(ts)"],
  testEnvironment: "node",
}

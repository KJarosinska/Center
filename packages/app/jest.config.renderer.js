const jestConfig = require("./jest.config.core")

module.exports = {
  ...jestConfig,
  testMatch: [
    "**/components/**/?(*.)+(test|spec).[jt]s?(x)",
    "**/actions/**/?(*.)+(test|spec).[jt]s?(x)",
    "<rootDir>/src/contact-support/**/?(*.)+(test|spec).[jt]s?(x)",
    "<rootDir>/src/__deprecated__/renderer/**/?(*.)+(test|spec).[jt]s?(x)",
    "<rootDir>/src/contacts/helpers/**/?(*.)+(test|spec).[jt]s?(x)",
  ],
  testEnvironment: "jsdom"
}

const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("../../tsconfig");

module.exports = {
  testPathIgnorePatterns: ["node_modules", "esm", "test-e2e", "cypress"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/../../",
  }),
  setupFilesAfterEnv: ["./jest.setup.ts"],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json'
    }
  }
};

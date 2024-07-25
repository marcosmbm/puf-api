require("dotenv/config");
require("dotenv-safe/config");

const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

const { exec } = require("node:child_process");

process.env.DATABASE_URL = `${process.env.DATABASE_URL}_testedb?schema=teste_schema`;

exec("npm run db:migrate");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
};

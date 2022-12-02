module.exports = {
  preset: "ts-jest", // Tell Jest to use `ts-jest` plugin.
  testEnvironment: "node", // Execution environment (can't be `ts-node`).
  projects: [
    {
      displayName: "node:🟡 env project",
      transform: {
        "^.+\\.(t|j)sx?$": "ts-jest",
      },
      testEnvironment: "node",
      testMatch: ["**/__tests__/**/*.test.ts?(x)"],
    },
    {
      displayName: "jsdom:🟢 browser env project",
      transform: {
        "^.+\\.(t|j)sx?$": "ts-jest",
      },
      testEnvironment: "jsdom",
      testMatch: ["**/__tests__/**/*.test.jsdom.ts?(x)"],
    },
  ],
}

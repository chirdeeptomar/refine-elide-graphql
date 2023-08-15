module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest"
    },
    transformIgnorePatterns: ["node_modules/(?!(camelcase)/)"]
};

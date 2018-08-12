module.exports = {
    extends: "eslint:recommended",
    plugins: [],
    env: {
        browser: true,
        node: true,
        es6: true
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module"
    },
    globals: { ActiveXObject: true },
    rules: {
        "no-console": 0,
        semi: ["warn", "never"]
    }
}

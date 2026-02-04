const js = require("@eslint/js");

module.exports = [
    js.configs.recommended,
    {
        rules: {
            "no-useless-escape": "error",
            "no-unused-vars": "warn",
            "no-undef": "error"
        },
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: "commonjs",
            globals: {
                window: "readonly",
                document: "readonly",
                localStorage: "readonly",
                CustomEvent: "readonly",
                console: "readonly",
                module: "readonly",
                require: "readonly",
                __dirname: "readonly",
                process: "readonly",
                setTimeout: "readonly"
            }
        }
    }
];

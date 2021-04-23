module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  plugins: ["html"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        // printWidth: 80,
        semi: false, // 使用分号
        singleQuote: false, // 使用单引号
        // tabWidth: 2, // tab缩进大小
        // useTabs: false, // 使用tab缩进
        trailingComma: 'es5', // 行尾逗号
        // bracketSpacing: true, // 对象中的空格
        // jsxBracketSameLine: false, // JSX标签闭合位置(默认换行)
        arrowParens: 'always', // 箭头函数参数括号
      },
    ],
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
  globals: {
    'wx': false
  }
};

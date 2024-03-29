module.exports = {
  env: {
    jest: true,
    es2020: true,
    node: true,
    browser: true
  },
  extends: ['prettier', 'airbnb-base', 'plugin:vue/essential'],
  // required to lint *.vue files
  plugins: ['prettier', 'vue'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 11,
    sourceType: 'module'
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    'no-console': ['off'],
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never'
      }
    ],
    indent: 'off',
    'object-curly-newline': 'off',
    'import/prefer-default-export': 'off',
    'import/named': 'off',
    'operator-linebreak': 'off'
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack/webpack.base.conf.js'
      }
    }
  }
};

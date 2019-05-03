module.exports = {
  'extends': 'airbnb',
  'parser': 'babel-eslint',
  'env': {
    'jest': true,
  },
  'rules': {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': 'off',
    'object-curly-newline': ["error", { "ImportDeclaration": "never"}],
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state',
      ]
    }],
    'no-underscore-dangle': 'off',
    "react/destructuring-assignment": 'off',
    "react/prefer-stateless-function": 'off',
    "linebreak-style": 'off',
    "react/jsx-one-expression-per-line": { "allow": "single-child" }
  },
  'globals': {
    "fetch": false
  }
}
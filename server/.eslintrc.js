module.exports = {
  extends: 'airbnb-base',
  rules: {
    eqeqeq: 0,
    'linebreak-style': 0,
    'no-console': 0,
    'comma-dangle': 0,
    'arrow-parens': 0,
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 0,
    'max-len': 0,
    'no-unused-expressions': ['error', { allowTernary: true }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }]
  }
};

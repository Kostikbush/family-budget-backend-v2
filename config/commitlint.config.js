const { types, scopes, ticketRegexpWithBrackets } = require('./constants.js');

const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', types.map((type) => type.value)],
    'scope-enum': [2, 'always', scopes.map((scope) => scope.value)],
    'subject-case': [0],
    'scope-empty': [2, 'never'],
    'ticket-empty': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'ticket-empty': ({ subject }) => {
          return [ticketRegexpWithBrackets.test(subject), 'Subject does not contain ticket ID'];
        },
      },
    },
  ],
};

module.exports = config;

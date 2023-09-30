const types = [
  {
    name: '(feat) Добавление нового функционала',
    value: 'feat',
  },
  {
    name: '(fix) Исправление ошибок',
    value: 'fix',
  },
  {
    name: '(test) Добавление тестов',
    value: 'test',
  },
  {
    name: '(perf) Улучшения производительности',
    value: 'perf',
  },
  {
    name: '(refactor) Рефакторинг',
    value: 'refactor',
  },
  {
    name: '(docs) Обновление документации',
    value: 'docs',
  },
  {
    name: '(style) Правки по стилю кода',
    value: 'style',
  },
  {
    name: '(deps) Обновление и изменение зависимостей',
    value: 'deps',
  },
  {
    name: '(ci) Изменения в файлах конфигурации и сценариях CI',
    value: 'ci',
  },
  {
    name: '(chore) Другие изменения',
    value: 'chore',
  },
];


const ticketRegexp = /[A-Za-z]+-[0-9]+/;
const ticketRegexpWithBrackets = /\[[A-Za-z]+-[0-9]+\]/;

module.exports = { types, ticketRegexp, ticketRegexpWithBrackets };

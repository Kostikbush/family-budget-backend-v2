const { input,  select } = require('@inquirer/prompts');
const { execSync } = require('child_process');

const { types, ticketRegexp } = require('./constants.js');

const getPromptAnswers = async () => ({
  type: await select({
    message: 'Тип коммита. По умолчанию feat',
    choices: types,
    pageSize: 10,
  }),
  subject: await input({
    message: 'Заголовок коммита (commit subject)',
    validate: (value) => value.trim().length > 0 || 'Необходимо ввести заголовок коммита',
  }),
  body: await input({
    message: 'Подробное описание комита (commit body). Для новой строки используй |',
  }),
});

const getVaulesFromPromptAnswers = (answers) => ({
  type: answers.type ?? 'feat',
  scope: answers.scope.length > 0 ? answers.scope.join(',') : 'family',
  subject: answers.subject,
  body: answers.body
    .split('|')
    .map((el) => el.trim())
    .join('\n'),
});

const getTicketFromBranchName = () => {
  const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  return branchName.match(ticketRegexp)?.[0]?.toUpperCase() ?? '';
};

module.exports = (async () => {
  const answers = await getPromptAnswers();
  const values = getVaulesFromPromptAnswers(answers);
  const ticketFromBranchName = getTicketFromBranchName();

  const commitMessage = `${values.type}(${values.scope}): [${ticketFromBranchName}] ${values.subject}\n\n${values.body}`;

  try {
    const result = execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    // Через консоль выводим результат работы execSync
    // eslint-disable-next-line no-console
    console.log(result.toString());
  } catch (error) {}
})();

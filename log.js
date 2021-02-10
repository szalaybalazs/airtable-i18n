const chalk = require('chalk');

const log = (message, emoji, step, maxStep) => console.log(chalk.gray(`[${step}/${maxStep}]`), `${chalk.reset(emoji)}  ${chalk.reset(message)}...`);

module.exports = log;
#!/usr/bin/env node
const program = require('commander');
const path = require('path');

program
	.version("1.0.1")
	.option("-d, --directory <directory>", "specify output directory")
	.option("-a, --api <apikey>", "specify airtable apikey")
	.option("-b, --base <baseid>", "specify base id")
	.option("-f, --beautify", "Beautify generated files")
	.option("-e, --env <path>", "Path to .env file")
	.parse(process.argv);

require('dotenv').config({ path: path.resolve(program.opts().env || './.env' )})


const options = {
	directory: process.env.AIRTABLE_I18N_DIRECTORY || program.opts().directory || '.',
	api: process.env.AIRTABLE_I18N_API_KEY || program.opts().api,
	base: process.env.AIRTABLE_I18N_BASE_ID || program.opts().base,
	beautify: program.opts().beautify,
};

const { parse, generate } = require("./index.js");

(async () => {
  if (!options.api) return console.log('Missing airtable API key.')
  if (!options.base) return console.log('Missing airtable base id.')
  try {
    const languages = await parse(options.api, options.base);
    generate(languages, options.directory, Boolean(options.beautify));
  } catch (error) {
    console.log('Failed to generate files: ', error);
  }
})();
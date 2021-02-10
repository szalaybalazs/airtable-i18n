const fs = require('fs');
const path = require('path');
const Airtable = require('airtable');

const getBase = (base) => (table) =>
  new Promise((res, rej) => {
    base(table)
      .select({
        maxRecords: 1000,
        view: 'Grid view',
      })
      .firstPage((err, records) => {
        if (err) return rej(err);
        res(records);
      });
  });

const handleRecord = (languages, table, record) => {
  table = table.toUpperCase();
  if (!languages[Object.keys(languages)[0]][table]) Object.keys(languages).forEach((key) => (languages[key][table] = {}));
  Object.keys(languages).forEach(key => (languages[key][table][record.get('key').toUpperCase().replace(/\s/g, '_')] = record.get(key)));
};

const parse = async (apiKey, baseId) => {
  const base = new Airtable({ apiKey }).base(baseId);
  const records = getBase(base);

  const tables = (await records('TABLES')).map((record) => record.get('name'));
  const meta = await records('Lng');
  const fields = { ...meta[0].fields };
  
  delete fields.key;
  const languageKeys = Object.keys(fields);
  
  const languages = languageKeys.reduce((acc, key) => ({ ...acc, [key]: {} }), {});

  meta.forEach((record) => handleRecord(languages, 'lng', record));

  await Promise.all(tables.map(async (table) => (await records(table)).forEach((record) => handleRecord(languages, table, record))));
  return languages;
};

const generate = async (languages, dir, beautify = false, format = 'js') => {
  const dirPath = path.resolve(dir);
  for (let i = 0; i < dirPath.split('/').length; i++) { 
    const currentPath = dirPath.split('/').slice(0, i).join('/');
    if (!currentPath) continue;
    if (!fs.existsSync(currentPath)) fs.mkdirSync(currentPath);
  }
  Promise.all(Object.keys(languages).map(key => new Promise((res) => fs.writeFile(`${dirPath}/${key}.${format}`, `${format === 'js' ? 'module.exports = ' : ''}${JSON.stringify(languages[key], null, beautify ? 2 : 0)}`, { encoding: 'utf8' }, res))));
};

const generateTranslation = async (apikey, baseId, { output = '.', beutify = false, format = 'js' }) => {
  const languages = await parse(apikey, baseId);
  generate(languages, output, beutify, format);
}

module.exports = {
  parse,
  generate,
  generateTranslation,
};

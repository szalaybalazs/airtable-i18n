Generate i18n translations from airtable base.
===

Generate separate translation files from airtable base.

Usage
---

1. Retreive Airtable api key

    Visit [Airtable Account page](https://airtable.com/account) and generate an api key.

2. Get the ID of translation base
    
    Visit [Airtable interactive API](https://airtable.com/api) and copy your translation base's ID.

3. Configure your base
  
    1. Create a `Lng` table in the base, with fields: `key | lng1 | lng2`

    2. Create a `TABLES` table with only one column, `name`, containing the name all the translation tables, except the `Lng` table.

    3. Create your first translation table.

### Example

**Lng**

| key | en | de | es |
|:---:|:--:|:--:|:--:|
|Key|EN|DE|ES|
|Name|English|German|Spanish|

**TABLES**

|name|
|:--:|
|general|

**general**

| key | en | de | es |
|:---:|:--:|:--:|:--:|
|Title|Demo translation|Demo-Übersetzung|Traducción de demostración|

### Example usage

Automatise the CLI command to run before each commit to generate translations each time when a commit is submited.

## CLI

`npx airtable-i18n`

### Options
```bash
-a, --api <apikey> - Airtable APIKEY
-t, --base <baseid> - ID of the airtable base
-d, --directory <directory> - Output directory of translations - OPTIONAL - Default: the same directory
-b, --beautify - Whether to beautify the generated language files
-f, --format - Format used to output the translations to
-e, --env <path> - relative path to .env file - OPTIONAL - Default: the same directory
-i, --index - provide flag to create an index.js file with all the exports
```

By default the command will search for an .env file in the same directory.

### .env options
```dotenv
AIRTABLE_I18N_DIRECTORY=<directory> - Example: .
AIRTABLE_I18N_API_KEY=<APIKEY>
AIRTABLE_I18N_BASE_ID=<BASEID>
AIRTABLE_I18N_TRANSLATION_FORMAT=<FILEFORMAT> - either js or json
AIRTABLE_I18N_INDEX=any - provide to generate index.js file with all the exports
```

### Example usage

```bash
npx airtable-i18n -a <APIKEY> -b <BASEID> -d ./translation -b -f json
```

or

```bash
npm i -g airtable-i18n
airtable-i18n -a <APIKEY> -b <BASEID> -d ./translation -b -f json
```

## Node package
```javascript
const { generateTranslation } = require('./index');

generateTranslation('<APIKEY>', '<BASEID>', { output: './lngs', beutify: true, format: 'js' });
```

### Options

| Option | Required | Description | Default |
|--------|:--------:|-------------|---------|
| APIKEY | True | The airtable apikey | - |
| BASEID | True | The ID of the airtable base | - |
| output | false | The output directory for translations | '.' |
| beautify | false | Whether to beautify the generated translation files | false |
| format | false | The format of the output files | js |
| generateIndex | false | Whether to generate index.js file | false |

## Access translation

The translations are grouped under the name of the tables. 

The key value of the record is used as the key of the translation.

### Example using react

```js
const { t } = useTranslation('<TABLE_NAME>');
t('<TRANSLATION_KEY>);
```

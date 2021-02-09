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
-b, --base <baseid> - ID of the airtable base
-d, --directory <directory> - Output directory of translations - OPTIONAL - Default: the same directory
-f, --beautify - Whether to beautify the generated language files
-e, --env <path> - relative path to .env file - OPTIONAL - Default: the same directory
```

By default the command will search for an .env file in the same directory.

### .env options
```dotenv
AIRTABLE_I18N_DIRECTORY=<directory> - Example: .
AIRTABLE_I18N_API_KEY=<APIKEY>
AIRTABLE_I18N_BASE_ID=<BASEID>
```

### Example usage

```bash
npx airtable-i18n -a <APIKEY> -b <BASEID> -d ./translation -f
```

or

```bash
npm i -g airtable-i18n
airtable-i18n -a <APIKEY> -b <BASEID> -d ./translation -f
```

## Node package
```javascript
const { generateTranslation } = require('./index');

generateTranslation('<APIKEY>', '<BASEID>', { output: './lngs', beutify: true });
```

### Options

| Option | Required | Description | Default |
|--------|:--------:|-------------|---------|
| APIKEY | True | The airtable apikey | - |
| BASEID | True | The ID of the airtable base | - |
| output | false | The output directory for translations | '.' |
| beautify | false | Whether to beautify the generated translation files | false |

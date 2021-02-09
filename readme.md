Generate i18n translations from airtable base.
===

Generate separate translation files from airtable base.

Usage
---

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
airtable-i18n -a <APIKEY> -b <BASEID> -d ./translation -f
```

## Node package

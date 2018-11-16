
# Create Salesforce Custom Objects and Fields by SFDX from CSV Data.

## Purpopse

Sometimes we need to create massive volume of custom objects and custom fields in Salesforce Org.
It is apparently very tidious work to handle this from GUI.

The logic in this repo is more like POC, there are many hardcoded logic that can be abstracted out.

Also appologize that this is done in quick&dirty way, code isn't clean at all...

## fundamental logic

[shane-sfdx-plugins](https://github.com/mshanemc/shane-sfdx-plugins) is a third-party DX plugin, and the core of this repo. It allows us to create related xml files which can be converted and pushed into traditional Salesforce org.

The code in this repo read data from CSV and run shale-sfdx commands to create xml files.

## Prerequistes

1. Install SFDX CLI
2. Install NodeJS (for parsing CSV data)
3. The possibility to create scratch org (such as free-of-charge 30 day trial Dev Hub)
4. Install [shane-sfdx-plugins](https://github.com/mshanemc/shane-sfdx-plugins)

## Steps

1. Clone this repo to local.
2. Run `npm insall`
3. Run `node createObject.js` to create the sample two objects from `csv-data/objects.csv`
4. Run `node createField.js` to create the sample two objects from `csv-data/fields.csv`
5. Run `sfdx force:source:convert -d mdapi/ --packagename data-model` to convert the solution into metadata API compatible package
6. Run `sfdx force:mdapi:deploy -d mdapi/ -u dev-edition-box -l NoTestRun -w 5` to deploy package to a traditional org with DX Alias `dev-edition-box`
7. You should see message similar to below.

```bash
=== Result
Status:  Succeeded
jobid:  0Af1n00001X5AbNCAV
Completed:  2018-11-16T13:47:49.000Z
Component errors:  0
Components deployed:  4
Components total:  4
Tests errors:  0
Tests completed:  0
Tests total:  0
Check only: false
```

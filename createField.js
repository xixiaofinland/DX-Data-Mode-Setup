const csv = require('csv-parser')
const fs = require('fs')
const results = [];

let objects = new Set();
fs.createReadStream('./csv-data/fields.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    let fields = [];
    for (let row of results) {
      let sField = new SField(row);
      fields.push(sField);
    }
    createFieldData(fields);
  });


function createFieldData(fields) {
  for (let field of fields) {
    const util = require('util');
    const exec = util.promisify(require('child_process').exec);

    createFieldDataByDX();
    async function createFieldDataByDX() {
      let command = `sfdx shane:object:field --api ${field.api} -n ${field.label} -t ${field.type} -o ${field.parent} -l 255`;
      //sfdx shane:object:field --api Game__c -l 255 -n "Game Type" -t Text -o Game__c --noindex
      console.log(command);

      const {
        stdout,
        stderr
      } = await exec(command);

      if (stdout) {
        console.log('Stdout: => ', stdout);
      }
      if (stderr) {
        console.log('ERROR: => ', stderr);
      }
    }
  }
}

function SField(obj) {
  this.label = obj.label;
  this.plural = obj.plural;
  this.api = obj.api;
  this.description = obj.description;
  this.type = obj.type;
  this.parent = obj.parent;
}

//sfdx shane:object:create --label "Game1" --plural "Game1s" --api Game1__c -t custom ---nametype=Text --description="this stores customer's game record1"

const csv = require('csv-parser')
const fs = require('fs')
const results = [];

let objects = new Set();
fs.createReadStream('./csv-data/data-model.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    for (let row of results){
      console.log(row);
    }
  });

//sfdx shane:object:create --label "Game1" --plural "Game1s" --api Game1__c -t custom ---nametype=Text --description="this stores customer's game record1"
//sfdx shane:object:field --api Game__c -l 255 -n "Game Type" -t Text -o Game__c --noindex

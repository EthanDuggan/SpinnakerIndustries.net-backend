const XLSX = require('xlsx');

let engProductLog_xls = XLSX.readFile('//horton/reference/Eng Product Log.xls');
let installationInstructions = XLSX.utils.sheet_to_json(engProductLog_xls.Sheets['Installation Instructions']);
let wiringDiagrams = XLSX.utils.sheet_to_json(engProductLog_xls.Sheets['Wiring Diagrams']);

console.log(installationInstructions);

// create server for serving the api
const express = require('express');

const app = express();

//app.listen(process.env.PORT || 8080, () => console.log('app available at port 8080'));

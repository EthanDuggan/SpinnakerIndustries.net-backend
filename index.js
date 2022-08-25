const express = require('express');
const XLSX = require('xlsx');

let appData = loadData();
console.log(appData.installationInstructions); // testing purposes

// create server for serving the api
const app = express();
app.use(express.json()); // parses all incoming HTTP request bodies into JSON objects (by default they are just treated as strings)

// routes
app.get('/WiringDiagrams', (req, res) => {res.status(200).send(appData.wiringDiagrams);});
app.get('/InstallationInstructions', (req, res) => {res.status(200).send(appData.installationInstructions);});

app.listen(8080, () => console.log('app available at port 8080'));

function loadData() {
    let data = {}

    // load the "Installation Instructins" and "Wiring Diagrams" from "//horton/reference/Eng Product Log.xls" and convert them into arrays of JSON objects, where each JSON object in the array represents a row of data
    let engProductLog_xls = XLSX.readFile('//horton/reference/Eng Product Log.xls');
    data.installationInstructions = XLSX.utils.sheet_to_json(engProductLog_xls.Sheets['Installation Instructions']);
    data.wiringDiagrams = XLSX.utils.sheet_to_json(engProductLog_xls.Sheets['Wiring Diagrams']);

    return data;
}

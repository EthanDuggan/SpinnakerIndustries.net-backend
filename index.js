const express = require('express');
const cors = require('cors');
const XLSX = require('xlsx');
const fs = require('fs');

const PORT = 8081;
const frontEndServerOrigin = 'http://spin.net';
const EngProductLogPATH = '/horton-reference/Eng\ Product\ Log.xls';

let EngProductLogData;
let EngProductLogLastModifiedTime;
loadEngProductLogData();

//console.log(appData.installationInstructions); // testing purposes

// create server for serving the api
const app = express();
app.use(cors({origin: frontEndServerOrigin})); // adds a Cross-origin Resource Sharing (CORS) policy middleware that allows the spinnakerindustries.net front-end to make http requests to this server
app.use(express.json()); // parses all incoming HTTP request bodies into JSON objects (by default they are just treated as strings)

// routes
app.get('/WiringDiagrams', (req, res) => {res.status(200).send(EngProductLogData.wiringDiagrams);});
app.get('/InstallationInstructions', (req, res) => {res.status(200).send(EngProductLogData.installationInstructions);});

app.listen(PORT, () => console.log(`app available at port ${PORT}`));

//periodically check for new data from the xls file every 10 seconds
setInterval(reloadData, 10000);


// FUNCTIONS

function reloadData() {
    if(getLastModifiedTime(EngProductLogPATH) > EngProductLogLastModifiedTime) loadEngProductLogData();
}

function loadEngProductLogData() {
    console.log(`loading data from ${EngProductLogPATH}`);
    EngProductLogLastModifiedTime = getLastModifiedTime(EngProductLogPATH);
    EngProductLogData = {};

    // load the "Installation Instructins" and "Wiring Diagrams" from "//horton/reference/Eng Product Log.xls" and convert them into arrays of JSON objects, where each JSON object in the array represents a row of data
    let engProductLog_xls = XLSX.readFile(EngProductLogPATH);
    EngProductLogData.installationInstructions = XLSX.utils.sheet_to_json(engProductLog_xls.Sheets['Installation Instructions'], {raw: false});
    EngProductLogData.wiringDiagrams = XLSX.utils.sheet_to_json(engProductLog_xls.Sheets['Wiring Diagrams'], {raw: false});

}

function getLastModifiedTime(filename) {
    try {
        const stats = fs.statSync(filename);
        return stats.mtime;
    } catch (error) {
        console.log(error);
    }
}

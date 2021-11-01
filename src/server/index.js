const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

//Express
const app = express()
app.use(express.static('dist'))

//Body-Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Cors
const cors = require('cors');
app.use(cors());

console.log(__dirname)

const apiKey = process.env.API_KEY;

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

const port = 8082;

app.listen(port, function () {
    console.log(`Senti.me app listening on port ${port}!`)
});


const request = require('request');
//POST request
app.post('/sentime', (req, res) => {
    const url = req.body.url;
    const lang = req.body.lang;
    getSentime(url, lang, apiKey, (data) => {
        res.send(data);
    });

})
const getSentime = (url, lang, key, callback) => {
    request(`https://api.meaningcloud.com/sentiment-2.1?key=${key}&lang=${lang}&url=${url}`, { 
        json: true }, 
        (err, res, body) => {
        if (!err && res.statusCode == 200) {
            callback(body);
        }   else {
            console.log(error);
        }
    });
}


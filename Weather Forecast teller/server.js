const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const pug = require('pug');
const { json } = require('express');
const path = require('path');
const { urlencoded } = require('body-parser');
const { Console } = require('console');
const app = express();
const port = 80;
app.use('/static', express.static("static"));
app.use(bodyParser.urlencoded({ extended: true }));
//___________________________________________
//       pug setting
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));
//___________________________________________
app.get('/', (req, res) => {
    res.render('home.pug', {});
})
app.post('/', (req, res) => {
    console.log("post request recived");
    const cityName = req.body.city;
    const countryName = req.body.country;
    var temp_min;
    var temp_max;
    var dayStatus;
    //              How to get JSON data
    const urlWebsite = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "," + countryName + "&appid=fcc7c4dcd921f23cc069f8d9ac2648bb&units=metric";
    https.get(urlWebsite, (response) => {
        console.log('statusCode:', response.statusCode);
        //    this get the data from the repsone 
        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            //   console part
            console.log(weatherData.main.temp_min);
            console.log(weatherData.main.temp_max);
            console.log(weatherData.weather[0].main);

            temp_min = Number(weatherData.main.temp_min);
            temp_max = Number(weatherData.main.temp_max);
            dayStatus = weatherData.weather[0].description;
            const IconCode = weatherData.weather[0].icon;
            const Image = "http://openweathermap.org/img/wn/" + IconCode + "@2x.png";
            res.write(`<h1>The Day Status is <i><em>${dayStatus}</em></i></h1>`);
            res.write(`<div><h3> The Minmium Tempurature is ${temp_min} & Maximiun is ${temp_max}.</h3> <image src=${Image}></div>`);
            res.send();
        });
    })
})
app.listen(80, () => {
    console.log("Server is on at ", port);
})
const express = require('express');
// const https = require('https');
const bodyParser = require('body-parser');
const pug = require('pug');
const { json } = require('express');
const path = require('path');
const { urlencoded } = require('body-parser');
// const { Console } = require('console');
const app = express();
const port = 80;
app.use('/static', express.static("static"));
app.use(bodyParser.urlencoded({ extended: true }));
//___________________________________________
//       pug setting
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));
//___________________________________________
app.get('/home', (req, res) => {
    res.render('home.pug', {});
})
// app.get('/home', (req, res) => {
//     res.render('home.pug', {});
// })
// app.get('/home', (req, res) => {
//     res.render('home.pug', {});
// })
// app.get('/home', (req, res) => {
//     res.render('home.pug', {});
// })
app.listen(port,()=>{
    console.log('Server is start at the port '+port);
})
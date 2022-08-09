const express = require('express');
const path = require('path');
const port = 3000;
const app = express();

// set the static files
app.use('/static', express('static'));
app.use(express.urlencoded({extended:true}));
// config the Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'/views'));
// pug endpoint
app.get('/', (req, res) => {
    const params={};
    res.render('danceWebsite', params);
})

//  listen
app.listen(port, () => {
    console.log("Server is start at the 3000 port");
})
const express = require('express');
const app=express();
const path = require('path');
//   set port
const port=8000;
app.use('/static', express.static('static'));

//______________________ PUG Settings ______________________________
// set the PUG to the view template engine
app.set('view engine', 'pug');
// Set the views directory
app.set('views', path.join(__dirname, 'views'));
app.get('/',(req,res)=>{
    res.status(200).render('home.pug',{});
})
app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug',{});
})
app.post('/',()=>{
    console.log("Something is post");
})
//__________________________________________________________________

app.listen(port,()=>{
    console.log("Server is on At 80");
})
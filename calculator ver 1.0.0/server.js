// jshint eversion:6
const express = require('express');
const bodyParser=require('body-parser');
const { urlencoded } = require('body-parser');
// module.exports = router;
const app=express();
app.use(bodyParser,urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.sendFile(__dirname +   '/page/index.html');
})
app.post('/',(req,res)=> 
{
    console.log(req.body);
    res.send("Thank you");
})
app.listen(3000,()=>{
    console.log("Server is ON at 3000 port");
})
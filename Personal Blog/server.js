const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');
const { json } = require('express');
const path = require('path');
const { urlencoded } = require('body-parser');
const app = express();
const port = 80;

app.use('/static', express.static("static"));
app.use(bodyParser.urlencoded({ extended: true }));
//______________________________________________________________________________________
//       pug setting
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));
//______________________________________________________________________________________

const homeData="Lorem ipsum dolor, sit amet consectetur     Lorem ipsum dolor sit amet consectetur adipisicing elit. Error illo, odio quod animi quos architecto fugiat eum nemo exercitationem consequuntur id maxime. Quos nobis, doloribus blanditiis sint at quibusdam soluta?adipisicing elit. Maxime dolorem explicabo veritatis aspernatur necessitatibus. Accusamus blanditiis cum omnis, odio ratione, alias aliquam doloremque necessitatibus est eius distinctio. Assumenda, eaque adipisci.";
const aboutData="sit amet consectetur adipisicing elit. Error illo, odio quod animi quos architecto fugiat eum nemo exercitationem consequuntur id maxime. Quos nobis, doloribus blanditiis sint at quibusdam soluta?";
const contactData= "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione magnam similique fuga, quibusdam voluptatum totam praesentium sapiente libero nesciunt iste? Maiores impedit nihil nam. Voluptate cum suscipit ducimus. Blanditiis, repellat?Ipsum porro veritatis tempore suscipit, enim optio temporibus eos nobis veniam officia magnam illum amet ducimus quia aut, dolores culpa velit praesentium minus consectetur, tempora iste? Non soluta dolorum cumque.Repellat nobis reprehenderit aliquid totam soluta at distinctio ducimus, ipsum voluptatum quam libero, tempore dolor velit adipisci tempora doloremque dolore consectetur assumenda fugiat voluptate nihil delectus laudantium veniam animi. Dignissimos.Corrupti maiores consectetur qui pariatur dolor ad doloremque omnis quos iure incidunt nobis, expedita fuga iste doloribus earum asperiores est nemo ut unde voluptate quibusdam, animi esse facilis. Mollitia, quaerat?Reprehenderit explicabo ipsam dignissimos fuga commodi maxime doloremque, aliquam laudantium ducimus corporis deleniti cum animi numquam quaerat, fugiat velit iste, rem magni odio culpa soluta assumenda. Accusantium quos nisi ducimus?";

let postList=[];

app.get('/home', (req, res) => {
    let params={
        postList:postList,
        homedata:homeData
    }
    res.render('home.pug', params);
})
app.get('/contact', (req, res) => {
    let params={
        contactdata:contactData
    }
    res.render('contact.pug', params);
})
app.get('/about', (req, res) => {
    let params={
        aboutData:aboutData
    }
    res.render('about.pug',params);
})
app.get('/compose', (req, res) => {
    let params={};
    res.render('composeBlog.pug',params);
})
app.post('/compose', (req, res) => {
    let newPost={
        title : req.body.title,
        message:req.body.composeNew
    }
    postList.push(newPost);
    
    res.redirect('/home');
})
app.listen(port,()=>{
    console.log('Server is start at the port '+port);
})
const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');
const { json } = require('express');
const path = require('path');
const { urlencoded } = require('body-parser');
const app = express();
app.use('/static', express.static("static"));
var _ = require('lodash');
app.use(bodyParser.urlencoded({ extended: true }));
//______________________________________________________________________________________
//       pug setting
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));
//______________________________________________________________________________________
const port = 80;
var blogShowRequest='';
let postList=[];
let newPostDay1={
    title : 'Day 1',
    message:"You are a great blessing to my life, and the essence of my existence is you. You gave me another chance to love again, and you showered me with true love. You are the happiness I look up to seeing every day. I promise to stick to you and always be there when you need me. I love you more than you can imagine. Good morning to you, my sugar pie. Good morning, my pretty angel. I hope this new day is beautiful and takes you closer to achieving your dreams in life. May all your sorrow be turned into joy and Laughter. Always remember I love and cherish you so much, looking forward to spending the day with you. I hope you have a great day, darling."
}
let newPostDay2={
    title : 'Day 2',
    message:"A love paragraph is no doubt an important part of a romantic relationship, so if you have been searching for ideas for writing helpful love letters, you are at the right place. If you are looking for suggestions on how to write the perfect long paragraph for your loved one, start your paragraph with something deeply personal. Check out these long paragraphs for her ideas below."
}
let newPostDay3={
    title : 'Day 3',
    message:"Long Paragraphs for Her Copy and Paste: A well-written love paragraph makes your lover feel special. It’s much more than just a collection of words expressing your feelings for her. It’s emotionally charged, meaning that it was written with thoughtfulness, and you care enough to take the time piecing it up. Writing a love letter is not easy, especially if you want it to sound sincere. Unless you’re a professional writer, sometimes, expressing your emotions might seem like you’re putting on an act. So, how do you write a love letter that shows your true feelings?"
}
postList.push(newPostDay1);
postList.push(newPostDay2);
postList.push(newPostDay3);



//__________________________________  Initializing Data ___________________________________________________
const homeData="Lorem ipsum dolor, sit amet consectetur     Lorem ipsum dolor sit amet consectetur adipisicing elit. Error illo, odio quod animi quos architecto fugiat eum nemo exercitationem consequuntur id maxime. Quos nobis, doloribus blanditiis sint at quibusdam soluta?adipisicing elit. Maxime dolorem explicabo veritatis aspernatur necessitatibus. Accusamus blanditiis cum omnis, odio ratione, alias aliquam doloremque necessitatibus est eius distinctio. Assumenda, eaque adipisci.";
const aboutData="sit amet consectetur adipisicing elit. Error illo, odio quod animi quos architecto fugiat eum nemo exercitationem consequuntur id maxime. Quos nobis, doloribus blanditiis sint at quibusdam soluta?";
const contactData= "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione magnam similique fuga, quibusdam voluptatum totam praesentium sapiente libero nesciunt iste? Maiores impedit nihil nam. Voluptate cum suscipit ducimus. Blanditiis, repellat?Ipsum porro veritatis tempore suscipit, enim optio temporibus eos nobis veniam officia magnam illum amet ducimus quia aut, dolores culpa velit praesentium minus consectetur, tempora iste? Non soluta dolorum cumque.Repellat nobis reprehenderit aliquid totam soluta at distinctio ducimus, ipsum voluptatum quam libero, tempore dolor velit adipisci tempora doloremque dolore consectetur assumenda fugiat voluptate nihil delectus laudantium veniam animi. Dignissimos.Corrupti maiores consectetur qui pariatur dolor ad doloremque omnis quos iure incidunt nobis, expedita fuga iste doloribus earum asperiores est nemo ut unde voluptate quibusdam, animi esse facilis. Mollitia, quaerat?Reprehenderit explicabo ipsam dignissimos fuga commodi maxime doloremque, aliquam laudantium ducimus corporis deleniti cum animi numquam quaerat, fugiat velit iste, rem magni odio culpa soluta assumenda. Accusantium quos nisi ducimus?";


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
// ___________________________________ Compose _______________________________________
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
// __________________________________ Blogs ____________________________________________
//In the blog show property:
//                         this render only to the new page 

app.get('/Blog/:title',(req,res)=>{
    blogShowRequest=req.params.title;
    blogShowRequest= (_.lowerCase(blogShowRequest));
    console.log(blogShowRequest);
    postList.forEach(element => {

       if(_.lowerCase(element.title)==blogShowRequest){
        res.render('post.pug',{post : element});
       } 
    });
})
app.listen(port,()=>{
    console.log('Server is start at the port '+port);
})
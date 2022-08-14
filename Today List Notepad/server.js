const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.use("/static",express.static("static"));
const port = 3000;
var items=['Buy Food','Cook Meal','Eat'];

app.get('/', (req, res) => {
    var today = new Date();

    //              1st Method
    
    // const dayNames = ['Sunday', 'Monday', 'TuesDay', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    // const month = today.getMonth();
    // const parmas = {
        //     title: 'Notepad',
        //     day: dayNames[today.getDay()],
        //     month:monthNames[today.getMonth()],
        //     date:today.getDate(),
        // }

    //              2nd Method

    var options = { weekday: 'long', month: 'long', day: 'numeric' };
    const parmas={
        Day:today.toLocaleDateString('en-US',options),
        item:items
    }
    
    // console.log(today.toLocaleDateString('en-US',options));
    res.render('index.pug', parmas);
})


app.post('/',(req,res)=>{
    var newItem=req.body.textInput;
    if(newItem!=""){
        items.push(newItem); 
    }
    console.log(items);
    res.redirect('/');
})


app.listen(port, () => {
    console.log("Server is running at " + port);
})
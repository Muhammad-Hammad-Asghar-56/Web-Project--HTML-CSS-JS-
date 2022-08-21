const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.use("/static", express.static("static"));
const port = 3000;
let ItemArray = [];

//_________________________________________________________________________________
//                            DATABASE Settings
mongoose.connect("mongodb://127.0.0.1:27017/todoListDB");

//Get the default connection
const db = mongoose.connection;

//  add schema of the new blog
const toDoSchema = mongoose.Schema({
    toDoItem: {
        type: String,
        required: true,
    }
})
//  get model from the schema



const toDoModel = mongoose.model("todolists", toDoSchema);

//_________________________________________________________________________________
//                          Routing
//_________________________________________________________________________________
app.get('/', (req, res) => {
    var today = new Date();
    var options = { weekday: 'long', month: 'long', day: 'numeric' };

    
    toDoModel.find((err, itemsList) => {
        if (err) {
            console.log(err);
        }
        else {
            const parmas = {
                Day: today.toLocaleDateString('en-US', options),
                item: itemsList
            }
            res.render('index.pug', parmas);
        }
    });


})

app.post('/', (req, res) => {
    var newItem = req.body.textInput;
    if (newItem != "" && (! isPresentInList(newItem))) {
        let newToDoItem= new toDoModel({toDoItem:newItem});
        newToDoItem.save();
    }
    res.redirect('/');
})
app.post('/delete', (req, res) => {
    console.log(req.body);
    const id=req.body.delete;
    toDoModel.findByIdAndRemove(id,(err)=>{
        if(err){
            console.log(err);
        }
        else {
            console.log("Delete Sucessively");
            res.redirect('/');
        }
    })

})

//_________________________________________________________________________
//                          Validations
//_________________________________________________________________________
function isPresentInList(item){
    toDoModel.find((err, itemsList) => {
        if (err) {
            console.log(err);
        }
        else {
            itemsList.forEach(Element=>{
                if (Element === item){
                    return true ;
                }
            })
        }
    });
    return false;
}
app.listen(port, () => {
    console.log("Server is running at " + port);
})
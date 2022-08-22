const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const e = require('express');
const { render } = require('pug');
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
    if (newItem != "" && (!isPresentInList(newItem))) {
        let newToDoItem = new toDoModel({ toDoItem: newItem });
        newToDoItem.save();
    }
    res.redirect('/');
})
app.post('/delete', (req, res) => {
    console.log(req.body);
    const id = req.body.delete;
    toDoModel.findByIdAndRemove(id, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Delete Sucessively");
            res.redirect('/');
        }
    })

})
// _________________________________________________________________________
const defaultItems = ["Add New items", "Display Items", ",<- delete Items"]
const subListSchema = mongoose.Schema({
    name: String,
    items: defaultItems
})
const subList = mongoose.model('Sublists', subListSchema);
app.get("/todoList/:title", (req, res) => {
    var today = new Date();
    var options = { weekday: 'long', month: 'long', day: 'numeric' };

    subList.findOne({ name: req.params.title }, (err, foundItem) => {
        let params = {};
        if (!err) {
            if (foundItem == null) {
                const newSubListItem = new subList({
                    name: req.params.title,
                    items: defaultItems
                })
                newSubListItem.save();
                params = {
                    Day: today.toLocaleDateString('en-US', options),
                    itemsListName: newSubListItem.name,
                    items: newSubListItem.items
                }
            }
            else {
                params = {
                    Day: today.toLocaleDateString('en-US', options),
                    itemsListName: foundItem.name,
                    items: foundItem.items
                }
            }
            res.render('templatePage.pug', params);
        }
    })
})


app.post('/deleteSubList/:subListName', (req, res) => {
    console.log(req.params.subListName + "    " + req.body.delete);
    subList.findOne({ name: req.params.subListName }, (err, foundItem) => {
        if (err) {
            console.log(err);
        }
        else {
            for (let index = 0; index < foundItem.items.length; index++) {
                // const element = foundItem.items[index];
                if (foundItem.items[index] == req.body.delete) {
                    // foundItem = foundItem.filter(item => item !== foundItem.items[index]);
                    const val = req.body.delete;
                    foundItem.items = foundItem.items.filter(item => item !== val);
                    subList.updateOne({ _id: foundItem._id }, { items: foundItem.items }, function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Update Successfully");
                            res.redirect(`/todoList/${req.params.subListName}`);
                        }
                    });
                    break;
                }
            }
        }
    })

})
app.post('/updateSubList/:subListName', (req, res) => {
    console.log(req.params.subListName + " " + req.body.Add);
    subList.findOne({ name: req.params.subListName }, (err, foundItem) => {
        if (err) {
            console.log(err);
        }
        else {
            foundItem.items.push(req.body.Add);
            subList.updateOne({ _id: foundItem._id }, { items: foundItem.items }, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Update Successfully");
                    res.redirect(`/todoList/${req.params.subListName}`);
                }
            });
        }
    })
})



//_________________________________________________________________________
//                          Validations
//________________________________________________________________________
function isPresentInList(item) {
    _
    toDoModel.find((err, itemsList) => {
        if (err) {
            console.log(err);
        }
        else {
            itemsList.forEach(Element => {
                if (Element === item) {
                    return true;
                }
            })
        }
    });
    return false;
}
app.listen(port, () => {
    console.log("Server is running at " + port);
})
const express = require('express')
const app = express()
const port = 4000
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

//Connect to Atlas Cluster
const mongoDB = 'mongodb+srv://JamesP1996:GMIT!2020@re-agent.pzrtk.mongodb.net/RE-Agent?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true,useUnifiedTopology: true });

const connection = mongoose.connection;

//Console Log If Mongoose Connection was Successful
connection.once('open', () => {
    console.log("MongoDB Database Connection Established Successfully");

})

//Setting up Parameters of the Connection
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const Schema = mongoose.Schema;

//Setup user Schema
const userSchema = new Schema({
    name: {min:3, max:32, type:String, required:true},
    email: {min:3, max: 32, type:String, required:true},
    password: {min:3, max: 32, type:String, required:true},
    picture: String

}
, {
    timestamps: true,
  });

//Setup user Schema
const notesSchema = new Schema({
    title: {type:String, required:true},
    desc: {type:String, required:true},
    user: {type:String, required:true}
}
, {
    timestamps: true,
  });



const userModel = mongoose.model('user', userSchema);
const notesModel = mongoose.model('note',notesSchema);

//Testing Server
app.get('/', (req, res) => res.send('Test123'))

//Get Data From Api/user
app.get('/api/user', (req, res) => {
    userModel.find((error, data) => {
        res.json({ user: data })
    })
})

//Get Data From Api/notes
app.get('/api/notes', (req, res) => {
    notesModel.find((error, data) => {
        res.json({ notes: data })
    })
})

//Grab ID Data from Api/user
app.get('/api/user/:id', (req, res) => {
    console.log(req.params.id);

    userModel.findById(req.params.id, (error, data) => {
        res.json(data);
    })
})

//Grab ID Data from Api/notes
app.get('/api/notes/:id', (req, res) => {
    console.log(req.params.id);

    notesModel.findById(req.params.id, (error, data) => {
        res.json(data);
    })
})


// Handle Delete Request
app.delete('/api/user/:id', (req, res) => {
    console.log("Deleted user ID ::" + req.params.id);

    userModel.deleteOne({ _id: req.params.id },
        (error, data) => {
            res.json(data);
        })
})

// Handle Delete Request
app.delete('/api/notes/:id', (req, res) => {
    console.log("Deleted user ID ::" + req.params.id);

    notesModel.deleteOne({ _id: req.params.id },
        (error, data) => {
            res.json(data);
        })
})

//Handle Edit Request
app.put('/api/user/:id', (req, res) => {
    console.log("Edit: " + req.params.id);
    console.log(req.body);

    userModel.findByIdAndUpdate(req.params.id,
        req.body,
        { new: true },
        (error, data) => {
            res.json(data);
        })
})

//Handle Edit Request
app.put('/api/notes/:id', (req, res) => {
    console.log("Edit Notes: " + req.params.id);
    console.log(req.body);

    notesModel.findByIdAndUpdate(req.params.id,
        req.body,
        { new: true },
        (error, data) => {
            res.json(data);
        })
})

//Handle Get Requests
app.get('/api/user/:id', (req, res) => {
    console.log("GET: " + req.params.id);

    userModel.findById(req.params.id, (error, data) => {
        res.json(data);
    })
})

//Handle Get Requests Notes
app.get('/api/notes/:id', (req, res) => {
    console.log("GET: " + req.params.id);

    notesModel.findById(req.params.id, (error, data) => {
        res.json(data);
    })
})

//Handle Post Requests to Server Connected to Mongo Schema
app.post('/api/user', (req, res) => {
    console.log('Post request Successful');
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.picture);

    userModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        picture: req.body.picture,
    });

    res.json("Post Request Recieved!");
})

//Handle Post Requests to Notes in API
app.post('/api/notes', (req, res) => {
    console.log('Post request Successful');
    console.log(req.body.title);
    console.log(req.body.desc);
    console.log(req.body.user);

    notesModel.create({
        title: req.body.title,
        desc: req.body.desc,
        user: req.body.user
    });

    res.json("Post Request Recieved!");
})

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
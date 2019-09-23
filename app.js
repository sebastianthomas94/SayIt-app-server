const express = require('express');
const app = express();
 
const path = require('path');

var mongo = require('mongoose');
var url = "mongodb://localhost/SayItApp";


/* var Users = require("./model/usersmodel"); */
/* var Data = require("./model/Data"); */

var signuprouter = require('./routes/signup');
var loginrouter = require('./routes/login');
var datarouter = require('./routes/data');
mongo.connect(url,function(err){
    if(err) 
    throw err;
    else
    console.log("database connected")
});




app.use(express.static(path.join(__dirname+"/public")));  


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use("/signup", signuprouter);

app.use("/login", loginrouter);

app.use("/data", datarouter);





app.listen(process.env.PORT || 1234,()=>{
    console.log("Listening at http://localhost:1234/");
})
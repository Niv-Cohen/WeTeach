//Import Express
require('./models/User')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const userRoutes =require('./routes/UserRoutes')
const requireAuth = require('./middlewares/requireAuth')
const subjects = require('./routes/subjects');
require('dotenv').config();

//Start App
let app = express();
app.use(bodyParser.json())
app.use(authRoutes);
app.use(userRoutes);

app.use('/subjects',subjects);
const mongouri = mongoose.connect(process.env.DB_CONNECTION,{
    useNewUrlParser:true,
    useCreateIndex:true});

 mongoose.connection.on('connected',()=>console.log('connected in to mongo instance'));
 mongoose.connection.on('error',(err)=>console.error('error connecting Help',err));
//Assign port
var port =  3000;


// Welcome message
app.get('/',requireAuth,(req, res) => {
    res.send(`Your email is: ${req.user.email}`)
}
);


// Launch app to the specified port
app.listen(port, function() {
    console.log("Running FirstRest on Port "+ port);
})







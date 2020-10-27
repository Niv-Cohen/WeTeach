//Import Express
require('./models/User')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const requireAuth = require('./middlewares/requireAuth')

//Start App
let app = express();

app.use(bodyParser.json())
app.use(authRoutes);

const mongouri = 'mongodb+srv://Nivos_co:Nfn151294Nfn@cluster0.dx0zj.gcp.mongodb.net/DB?retryWrites=true&w=majority'
mongoose.connect(mongouri,{
    useNewUrlParser:true,
    useCreateIndex:true
});

 mongoose.connection.on('connected',()=>console.log('connected in to mongo instance'));
 mongoose.connection.on('error',(err)=>console.error('error connecting Help',err));


//Assign port
var port =  3000;


// Welcome message
app.get('/', requireAuth,(req, res) => {
    res.send(`Your email is: ${req.user.email}`)
}
);

// Launch app to the specified port
app.listen(port, function() {
    console.log("Running FirstRest on Port "+ port);
})
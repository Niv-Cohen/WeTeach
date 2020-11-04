const mongoose = require('mongoose');
const { schema } = require('./Subject');
const instSchema = mongoose.Schema({
    Name:{
        type:String
    },
})

module.exports = mongoose.model('instituten',instSchema);
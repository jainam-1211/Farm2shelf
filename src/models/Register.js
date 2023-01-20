const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    username :{
        type : String,
        required : true,
        unique : true
    },
    password : String,
    phone : String,
    address: String,
    nation : String
})

module.exports = mongoose.model("userSchema" , userSchema)
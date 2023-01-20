const mongoose = require('mongoose')

const Detail = mongoose.Schema({
    barndName : String,
    barndIconUrl :String,
    links : [
        {
        label : String,
        url: String
    },
],
})

module.exports = mongoose.model("detail" , Detail)
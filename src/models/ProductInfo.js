const mongoose = require('mongoose')

const productInfo = mongoose.Schema({
    product_name: String,
    product_description:String,
    quantity:Number,
    price:Number,
    product_category : String,
    phone: String,
    address:String,
    city:String,
    product_image : String,
    suggested_buyer : String,
    suggested_price : Number
})

module.exports = mongoose.model("productInfo" , productInfo)
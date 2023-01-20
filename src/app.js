const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
// const fileUpload = require('express-fileupload');
const Detail = require('./models/Detail')
const Slider = require('./models/Slider')
const User = require('./models/Register');
const e = require('express');
const Register = require('./models/Register');
const ProductInfo = require('./models/ProductInfo');
const staticmaps = require('staticmaps')
// import StaticMaps from 'staticmaps'


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/static',express.static('public'))

app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'));

// app.use(fileUpload)

const PUBLISHABLE_KEY = "pk_test_51MS3YpSIskPGPtyCdz6p7kmYT9pYYldAsEOk00lWYjEf0kpGT2yKQU2B6FqizD06XAEFDgjSffv0tgPE5gAW6Ltx00zKoEn7qs"

const SECRET_KEY = "sk_test_51MS3YpSIskPGPtyCFtiEBln2a00GVdQoBKHaLqztIzZbdSUegdlLpd3Ghd13yc2hEYFbEPmZknYvmTpCEfivqhZH00hBnvVFBP"

const stripe = require('stripe')(SECRET_KEY)

mongoose.connect("mongodb://localhost/website_tut" , ()=>{
    console.log("database connected"); 

    // ProductInfo.create({
    //     prduct_name : 'wheat',
    //     product_description : 'refined wheat',
    //     quantity : 2500,
    //     price: 1000,
    //     product_category : 'Grains',
    //     phone : '9930861065',
    //     address :' B-43 , trimurti park , mamletdar wadi , malad(w) , mumbai-400064',
    //     city : 'Mumbai',
    //     product_image : '/static.images/bg1.jpg',
    //     suggested_buyer : '',
    //     suggested_price : null
    // })
})

app.get("/" , async(req,res)=>{
    const details = await Detail.findOne({"_id":"63c6fe7a1d3d0af93e49b029"})
    const slides = await Slider.find()
    // console.log(details);
    res.render("login")
})

app.get("/home" , (req,res)=>{
    res.render("index")
})


app.get("/about" , async(req,res)=>{
    // const details = await Detail.findOne({"_id":"63c6fe7a1d3d0af93e49b029"})

    res.render("about")
})

app.get("/login" , async(req,res)=>{
    // const details = await Detail.findOne({"_id":"63c6fe7a1d3d0af93e49b029"})

    res.render("login")
})

app.post('/', async(req, res) => {
    const email = req.body.username;
    const password = req.body.pass;

    const user = await Register.find()
    console.log(user);
    let name;
    user.forEach(function(doc,err){
        if(doc.username==email && doc.password==password)
        {
            // console.log(doc.username);
            name = doc.name
            // console.log(doc.name);
        }
        else
        {
            console.log('Invalid username or password');
        }
    })
    res.render("index")

    

    // console.log(password);
    // // console.log(user.username);
    // if (email!==user.username) {
    //     return res.status(401).send('Invalid username or password');
    // }
    // if(password!==user.password)
    // {
    //     return res.status(401).send('Invalid username or password');
    // }
    // res.send("Successfull")
})

app.get("/register" , async(req,res)=>{
    // const details = await Detail.findOne({"_id":"63c6fe7a1d3d0af93e49b029"})
  
    res.render("register")
})

app.post("/register" , async(req,res)=>{
    const user = req.body.Username;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone
    const address = req.body.address
    const nation = req.body.nation
   
    Register.insertMany({"name":user , "username":email , "password":password , "phone":phone , "address":address,"nation":nation})
    res.redirect('login')
})


var multer = require('multer');
 
var Storage = multer.diskStorage({
    destination: "./public/images/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
 
var upload = multer({ storage: Storage }).single("file");

// var imgModel = require('./model');

app.get('/addproduct' , (req,res)=>{
    res.render("addproduct")
})

app.post("/productInfo/:product" , async (req,res)=>{
    const product = req.params.product;
    const name = req.body.bname;
    const price = req.body.sprice;
    console.log(name);
    console.log(price);
    const data3 = await ProductInfo.findOne({"_id":product} )
    console.log(data3.suggested_price);
    if(data3.suggested_price)
    {
        if(data3.suggested_price<price && price<data3.price)
        {
            console.log("Yes");
            ProductInfo.updateOne({"_id":product} , {"suggested_buyer":name , "suggested_price" : price} ,function(err,doc){
                if(err){
                    console.log(err);
                }
                else{
                    const data2 = ProductInfo.findOne({"_id":product} , function(err,product1){
                        if(!err){
                            console.log(product1);
                            res.render("productInfo" , {
                                data1 : product1
                            })
                        }
                    })
                }
            })
        }
        else
        {
            const data2 = ProductInfo.findOne({"_id":product} , function(err,product1){
                if(!err){
                    console.log(product1);
                    res.render("productInfo" , {
                        data1 : product1
                    })
                }
            })
            console.log("Your price should be greater then current bid price")
        }
    }


})

app.post('/addproduct' , upload, async (req,res)=>{
    const pname = req.body.pname;
    const pdescription = req.body.pdescription;
    const quantity = req.body.quantity;
    const price = req.body.price
    const pcategory = req.body.pcategory
    const phone = req.body.phone
    const address = req.body.address
    const city = req.body.city
    const imageUrl =req.file.filename

    ProductInfo.insertMany({"product_name":pname , "product_description":pdescription , "quantity":quantity , "price" : price , "product_category":pcategory , 
    "phone":phone , "address":address , "city":city , "product_image":imageUrl})

    // const product = await ProductInfo.find()
    // res.render("products" , {
    //     data:product
    // })
    // res.render("products");

})

app.get("/products" ,async (req,res)=>{

    const product = await ProductInfo.find()
    res.render("products" , {
        data:product
    })
})

app.get("/products/:orderid" , (req,res)=>{
    const id = req.params.orderid
    console.log(req.params.orderid);
    const data = ProductInfo.findOne({"_id":id} , function(err,product){
        if(!err){
            console.log(product);
            res.render("productInfo" , {
                data1 : product
            })
        }
    })

})
    
app.get("/productcategories", (req, res)=> {
    const id = null
    res.render("productcategories" , {
        data2:id

    });

})

app.get("/productcategories/:product", function(req, res) {
    const product = req.params.product;
    // console.log(product);
    let id = []
    const data = ProductInfo.find({}, function(err, data1) {
        if(!err) {
            data1.forEach(function(data1,err){
                if(data1.product_category === product) {
                    id.push(data1);
                }
            })
            id.sort(function(a,b){
                return a.price - b.price
            })
            res.render("productcategories", {data2:id});
        }
    }) 
    


app.post("/productInfo" , (req,res)=>{
    res.render("index")
})
// app.post('/updateInfo' , upload, (req,res)=>{
//     const pname = req.body.pname;
//     const pdescription = req.body.pdescription;
//     const quantity = req.body.quantity;
//     const price = req.body.price
//     const pcategory = req.body.pcategory
//     const phone = req.body.phone
//     const address = req.body.address
//     const city = req.body.city
//     const imageUrl =req.file.filename

//     ProductInfo.insertMany({"product_name":pname , "product_description":pdescription , "quantity":quantity , "price" : price , "product_category":pcategory , 
//     "phone":phone , "address":address , "city":city , "product_image":imageUrl})

// })

// app.post("/updateInfo" , (req,res)=>{
//     const pname = req.body.pname;
//     const pdescription = req.body.pdescription;
//     const quantity = req.body.quantity;
//     const price = req.body.price
//     const pcategory = req.body.pcategory
//     const phone = req.body.phone
//     const address = req.body.address
//     const city = req.body.city
//     const imageUrl =req.file.filename

//     ProductInfo.insertMany({"product_name":pname , "product_description":pdescription , "quantity":quantity , "price" : price , "product_category":pcategory , 
//     "phone":phone , "address":address , "city":city , "product_image":imageUrl})

// })
    // console.log(data);
    // data.forEach(function(data1,err){
    //     if(data1.product_category === product) {
    //         id.push(element);
    //     }
    // })
    

    // const data = ProductInfo.find({"product_catergory":product}, function(err, data1) {
    //     if(!err) {
    //         console.log(data1);
    //     }
    // })
})

// app.get('/map',function(req,res){
//     // var l = [];
//     // l.push(['1',23.567,88.645,1]);
//     // l.push(['2',23.560,88.647,2]);
//     // console.log(JSON.stringify(l));
//     // res.render('map',{ layout: false, lat:23.567, lon:88.678, l:l});
//     const options = {
//         width: 600,
//         height: 400
//       };
//       const map = new staticmaps(options);
//   });


// app.get('/gateway' , (req,res)=>{
//     res.render("gateway" , {
//         key : PUBLISHABLE_KEY
//     })
// })

app.post('/gateway' , (req,res)=>{
    stripe.customers.create({
        email : req.body.stripeEmail,
        source : req.body.stripeToken,
        name: 'Dhruv Gogri',
        address : {
            line1 : 'abcd',
            postal_code : '400064',
            city : 'Mumbai',
            state: 'Maharastra',
            country: 'India',

        }
    })
    .then((customer)=>{
        return stripe.charges.create({
            amount:7000,
            description: 'Web development product',
            currency : "USD",
            customer : customer.id
        })
    })
    .then((charge)=>{
        res.render("index")
        console.log(charge);
    })
    .catch((err)=>{
        res.render("index")
    })
})

app.get("/gateway/:id" , async (req,res)=>{
    const orderid = req.params.id
    const id = ProductInfo.findOne({"_id":orderid} , function(err,id){
        console.log(id.price);
        if(!err){
            const quantity = id.quantity
            if(quantity==1){
                ProductInfo.deleteOne({"_id":orderid} , function(err,docs){
                    if(err){
                        console.log(err);
                    }
                })
            }
            else{
                ProductInfo.updateOne({"_id":orderid} , {"quantity" : id.quantity-1} , function(err,docs){
                    if(err){
                        console.log(err);
                    }
                })
            }
            const price = id.price*100
            res.render("gateway" , {
                key : PUBLISHABLE_KEY,
                data1 : price
            })
        }
    })
})

app.get("/guidelines" , (req,res)=>{
    res.render("guidelines")
})

app.listen(process.env.PORT | 5555,()=>{
    console.log("server started");
})
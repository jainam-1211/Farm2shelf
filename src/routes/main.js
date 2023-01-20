const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { model } = require('mongoose')

const Detail = require('../models/Detail')
const Slider = require('../models/Slider')
const User = require('../models/Register')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// const routes = express.Router()

const users = [
    {
        id: 1,
        username: 'user1',
        password: '$2a$10$nI/2JWL4/aJk7jb4LfzKZuRRGpwL4ZhF0jbK/HtG9X0gS1z3.3T2y' // hashed password
    },
    {
        id: 2,
        username: 'user2',
        password: '$2a$10$nI/2JWL4/aJk7jb4LfzKZuRRGpwL4ZhF0jbK/HtG9X0gS1z3.3T2y' // hashed password
    }
];


app.get("/" , async(req,res)=>{
    const details = await Detail.findOne({"_id":"63c6fe7a1d3d0af93e49b029"})
    const slides = await Slider.find()
    // console.log(details);
    res.render("index" , {
        details:details,
        slides:slides,

    })
})

app.get("/gallery" , async(req,res)=>{
    const details = await Detail.findOne({"_id":"63c6fe7a1d3d0af93e49b029"})

    res.render("gallery",{
        details:details
    })
})

app.get("/about" , async(req,res)=>{
    // const details = await Detail.findOne({"_id":"63c6fe7a1d3d0af93e49b029"})

    res.render("about")
})

app.get("/login" , async(req,res)=>{
    // const details = await Detail.findOne({"_id":"63c6fe7a1d3d0af93e49b029"})

    res.render("login")
})

app.post('/login', (req, res) => {
    console.log(req.body.email);
    // const { email, password } = req.body;
})

// module.exports = routes




// Slider.create([
    //     {
    //         title: 'Learn Java in very easy manner',
    //         subTitle : 'Java is one of the most popular programming langugae.',
    //         imageUrl : "/static/images/s1.jpg"

    //     },
    //     {
    //         title: 'What is Django in python',
    //         subTitle : 'Django is most famous web framework of python  programming.',
    //         imageUrl : "/static/images/s2.jpg"

    //     },
    //     {
    //         title: 'WHat about node js?',
    //         subTitle : 'Node JS is runtime environment to execute javascript outside browser.',
    //         imageUrl : "/static/images/s3.jpg"

    //     }
    // ])


    // Detail.create({
    //     barndName: "Info Technical Solution",
    //     barndIconUrl : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.infotechinc.com%2F&psig=AOvVaw2aPkG_HR-NwgXrT-WGy9da&ust=1674070910233000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPil2qGuz_wCFQAAAAAdAAAAABAM",
    //     links:[
    //         {
    //             label:"Home",
    //             url:"/"
    //         },
    //         {
    //             label:"Services",
    //             url:"/services"
    //         },
    //         {
    //             label:"Gallery",
    //             url:"/gallery"
    //         },
    //         {
    //             label:"About",
    //             url:"/about"
    //         },
    //         {
    //             label:"Contact Us",
    //             url:"/contact-us "
    //         }
    //     ]
    // })

    // User.create({
    //     name : 'Dhruv',
    //     username : 'dhruvgogri18',
    //     password : '9930861065'
    // })

     // Register.create({
    //         name : 'Dhruv',
    //         username : 'dhruvgogri18',
    //         password : 'Dg9892211065@',
    //         phone : '9930861065',
    //         address :' B-43 , trimurti park , mamletdar wadi , malad(w) , mumbai-400064',
    //         nation : 'India'
    //     })


    // ProductInfo.create({
    //         prduct_name : 'wheat',
    //         product_description : 'refined wheat',
    //         product_image : '/static.images/bg1.jpg',
    //         product_category : 'Grains',
    //         phone : '9930861065',
    //         address :' B-43 , trimurti park , mamletdar wadi , malad(w) , mumbai-400064',
    //         city : 'Mumbai',
    //         price: 1000,
    //         quantity : 2500
    //     })
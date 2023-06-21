const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const connectDB = require("./database");
const errorHandler = require("./middleware/errorHandling");
// const { isAuthenticated } = require("./middleware/auth");
const User = require("./models/userModel");
const Product = require('./models/productModel')
dotenv.config();

// middleware
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'))


// Route: /health-api
app.get('/health-api', (req, res) => {
    const currentTime = new Date().toLocaleTimeString();
    const response = {
        time: currentTime,
        app: "express-server",
        status: "active"
    };
    res.json(response);
});

const isAuthenticated = async(req, res, next) => {
    console.log()
    const token = req.headers.token;
    console.log(token)
    try {
        const verify = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch(e) {
        return res.json({error: "Sign In First", err: e})
        
    }
    next();
}
// Route: /register
app.post('/register', async (req, res) => {
    try {
        //get all the data from body
        const { name, email, mobile, password } = req.body;
        // all data should exists
        if (!(name && email && mobile && password)) {
            res.status(400).send("Less data")
        }
        //check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(401).send("User already exists")
        }
        else {
            //encrpting the password
            // console.log(password)
            const myEncPassword = await bcrypt.hash(password, 10)
            //save the user in DB
            const user = await User.create({
                name,
                email,
                mobile,
                password: myEncPassword,
            })
            //generate a token for user and send it
            const token = jwt.sign(
                { id: user._id, email: email },
                process.env.JWT_SECRET_KEY,//process.env.jwtsecret
                {
                    expiresIn: "12h"
                }
            );
            user.token = token
            user.password = undefined
            res.send({
                status: "SUCCESS",
                message: "User registerd successfully",
                name: user.name,
                token,
            });
        }
    }
    catch (error) {
        console.log("Error Occured", error)
    }
})

// Route: /login
app.post('/login', async (req, res) => {
    try {
        //get all data from frontend
        const { email, password } = req.body;
        //validation
        if (!(email && password)) {
            return res.status(400).send("Something is missing")
        }
        //find user in DB
        const user = await User.findOne({ email })
        //If user is not their
        if (!user) {
            return res.status(401).send({ message: "User not exists" })
        }
        //match the password
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET_KEY,//process.env.jwtsecret
                { expiresIn: "12h" }
            );
            user.token = token
            user.password = undefined
            //send token in cookie parser
            //return a token
            const options = {
                expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
                httpOnly: true
            };
            res.status(200).cookie("token", token, options).json({
                success: true,
                token,
                user
            })
        }
    }
    catch (error) {
        console.log("Error Occured", error)
    }
})

//Route: /add-product
app.post('/add-product',isAuthenticated, async (req, res) => {
    try {
        let { nameofthecompany,category,addlogourl,linkofproduct,adddescription ,upvote ,date} = req.body;
        if(!upvote)
        upvote = 0
        category = category.split(',');
        if (nameofthecompany && category && addlogourl && linkofproduct && adddescription && upvote>=0) {
            const product = await Product.create({
                nameofthecompany,
                category,
                addlogourl,
                linkofproduct,
                adddescription,
                upvote,
                date,
            });
            return res.status(200).json({ message: 'Product added successfully',product:product });
        }
        else{
            return res.status(400).json({ 
                field:upvote,
                message: "Missing required fields",
            });
        }
    } 
    catch (err) {
        return res.status(500).json({ message: 'Internal server error'+err, });
    }
})

// Route: /get-product based on user selected categories
app.get('/',async(req,res,next)=>{
    let categories = req.query.category;
    let sort = '-'+req.query.sort;
    let search = req.query.search || "";
    try{
        const Products = await Product.find();
        let product="";
        if(categories === "All"){
            product = Products;
        }
        else{
        product = await Product.find({ category: { $regex: search, $options: "i" } })
        .where('category')
        .in(categories)
        .sort(sort)
        }
      res.send({
        status: "SUCCESS",
        message: "Product fetched successfully",
        product:product,
      })
    }
    catch(err){
      next(new Error("Something went wrong! Please try after some time."));
    }
  })

//Route get-all categories
app.get('/get-all-categories',async(req,res,next)=>{
    try{
        const Products = await Product.find();
        const all_categories = Products.flatMap(product => product.category);
        unique = [...new Set(all_categories)]

      res.send({
        status: "SUCCESS",
        message: "Product fetched successfully",
        categories:unique,
      })
    }
    catch(err){
      next(new Error("Something went wrong! Please try after some time."));
    }
})

//Route to post comment into database
app.post('/comment', async(req, res)=>{
    const {nameofthecompany, comment} = req.body;
    if(!nameofthecompany || !comment)
    return res.json({error: 'please fill all details'})
    try {
        const found_it = await Product.findOneAndUpdate({nameofthecompany}, {$push: {comments: comment}}, {
            new: true
        })
        res.json(found_it)
    } catch(e) {
        res.json({
            error: e,
        })
    }
})

app.post('/upvote', async(req, res)=>{
    const {nameofthecompany} = req.body;
    if(!nameofthecompany)
    return res.json({error: 'please fill all details'})
    try {
        const check = await Product.findOne({nameofthecompany});
        if(check==null || check==undefined) return res.json({error: "company doesn't exist in the database"}) 
        if(check.upvote!=null) {
        const found_it = await Product.findOneAndUpdate({nameofthecompany}, {$inc: {upvote: 1}}, {
            new: true
        })
        return res.json({upVotes: found_it.upvote})
        }
        const found_it = await Product.findOneAndUpdate({nameofthecompany},  {upvote: 0}, {
            new: true
        })
        return res.json({upvote: found_it.upvote})
    } catch(e) {
        res.json({
            error: e,
        })
    }
})


// Connect to MongoDB
connectDB();

// start server
app.listen(process.env.PORT, () =>
    console.log(`Server started on port ${process.env.PORT}`)
)

//Error handling middlewares
app.all('*',(req,res,next)=>{  
    const err = new Error('Something went wrong! Please try after some time');
    err.status = 'fail';
    err.statusCode = 404;
    next(err);
})
app.use((error,req,res,next)=>{
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 500;
    res.status(error.statusCode).json({
        status:error.statusCode,
        message:error.message
    })
})
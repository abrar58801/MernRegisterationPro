require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");


require("./db/conn");
const Register = require("./models/user_register");

const port = process.env.PORT || 8000;

// set path
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

// console.log(process.env.SECRET_KEY); it used for check env work or not

app.get("/", (req, res) =>{
    res.render("index");
});

app.get("/secret", auth , (req, res) => {    
    // console.log(`this is cookies ${req.cookies.jwt}`);
    res.render("secret");
});

app.get("/logout", auth , async(req, res) => {  
    try {
        console.log(req.user);

        // logout for single divice
        // req.user.tokens = req.user.tokens.filter((currElement) => {
        //     return currElement.token === req.token
        // })

        // logout for All divice
        req.user.tokens = [];

        res.clearCookie("jwt");
        console.log("Logout Successfully");

        await req.user.save();
        res.render("login");

    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/login", (req, res) => {
    res.render("login");
})

// create a new database and user register
app.post("/user_register", async (req, res) =>{
    try{
        const password = req.body.password;
        const c_password = req.body.c_password;
        if(password === c_password){
            const registerUser = await new Register({
                email: req.body.email,
                password: password,
                c_password: c_password,
                f_name: req.body.f_name,
                l_name: req.body.l_name,
                phone: req.body.phone,
                age: req.body.age,
                gender: req.body.gender,
            });

            console.log("the success part" + registerUser);

            const token = await registerUser.generateAutoToken();
            console.log("the token part" + token);
            
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 60000),
                httpOnly:true,
            });

            const registered = registerUser.save();
            res.status(201).render("login");
        }else{
            res.send("password are not match");
        };
    }catch(error){
        res.status(400).send(error);
        console.log("the error part page");
    };
});

// user login 
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await Register.findOne({email:email});

        const isMatch = await bcrypt.compare(password, useremail.password);

        const token = await useremail.generateAutoToken();
        console.log("the token part" + token);

        res.cookie("jwt", token, {
            expires:new Date(Date.now() + 60000),
            httpOnly:true,
            // secure:true
        });


        if(isMatch){
            res.status(201).render("index");
        }else{
            res.send("Invalid Login Details");
        }

    } catch (error) {
        res.status(400).send("Invalid Login Details");
    }
});


// hashing data for securty perpose
// const bcrypt = require("bcrypt");

// const securePassword = async (password) =>{
//     const passwordHash = await bcrypt.hash(password, 10);
//     console.log(passwordHash);

//     const passwordMatch = await bcrypt.compare("Atif@123", passwordHash);
//     console.log(passwordMatch);
// }
// securePassword("Atif@123");


// cookies loging jsonwebtoken
// const jwt = require("jsonwebtoken");

// const createToken = async () => {
//    const token = await jwt.sign({_id:"63c29a8e89b2cf2e1ab0627f"}, "asdfghjklzxcvbnmqwertyuioplkjhgfdsa", {
//     expiresIn: "2 seconds"
//    });
//    console.log(token);

//    const userVer = await jwt.verify(token, "asdfghjklzxcvbnmqwertyuioplkjhgfdsa");
//    console.log(userVer);
// };

// createToken();


app.listen(port, () =>{
    console.log(`Server running on port no ${port}`);
});
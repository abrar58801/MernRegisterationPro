const { create } = require("hbs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        trim: true,
    },
    password: {
        type: String,
        require: true,
        trim: true,
    },
    c_password: {
        type: String,
        require: true,
        trim: true,
    },
    f_name: {
        type: String,
        require: true,
        trim: true,
    },
    l_name: {
        type: String,
        require: true,
        trim: true,
    },
    phone: {
        type: Number,
        require: true,
    },
    age: {
        type: String,
        require: true,
        trim: true,
    },
    gender: {
        type: String,
        require: true,
        trim: true,
    },
    tokens: [{
        token: {
            type: String,
            require: true,
        }
    }]
});

// medile-ware 
// token genrating
userSchema.methods.generateAutoToken = async function() {
    try {
        console.log(this._id);
        const token = await jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        res.send("the error part" + error);
        console.log("the error part" + error);
    }
};

// converting password into hash
userSchema.pre("save", async function (next){
    if(this.isModified("password")){
        // console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        // console.log(`the current password is ${this.password}`);

        this.c_password = undefined;
    };
    next();
});

// now we need to create a collection
const Register = new mongoose.model("Register", userSchema);

module.exports = Register;
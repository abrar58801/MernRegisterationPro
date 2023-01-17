const mongoose = require("mongoose");

// mongodb connection here
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/registeration").then(() =>{
    console.log("db Connection Successful");
}).catch((e) =>{
    console.log("Connection Failed");
});
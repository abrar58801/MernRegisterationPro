const mongoose = require("mongoose");

// mongodb connection here
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_PATH).then(() =>{
    console.log("db Connection Successful");
}).catch((e) =>{
    console.log("Connection Failed");
});
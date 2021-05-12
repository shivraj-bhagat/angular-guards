const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const app = express();

dotenv.config();

// MongoDB Connection
mongoose.connect( process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then( () => 
console.log("DB CONNECTED")
).catch( function(err){
    console.log(err);
});

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// ports
const port = process.env.PORT || 3000;

// my routes
app.get("/", (req,res) => {
    res.send("Home Page");
});

// routes import
const authRoutes = require("./routes/auth");

// router use
app.use("/api", authRoutes)

// server initiate
app.listen(port, (err) => {
    if(err){
        console.log(err);
    } else {
        console.log("Server is Up and Running...\nLISTENING on PORT", port);
    }
});
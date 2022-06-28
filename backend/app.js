const express = require("express");
const errorMiddleware=require('./middleware/error');
const cookieParser = require("cookie-parser"); 
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload")

const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use(cors());
// Route imports
const productRoute=require("./routes/productRoute");
const userRoute=require("./routes/userRoutes");
const orderRoute=require("./routes/orderRoutes");

app.use('/api/v1',productRoute);
app.use('/api/v1',userRoute);
app.use('/api/v1',orderRoute);

// Midddleware for error
app.use(errorMiddleware);

module.exports=app;
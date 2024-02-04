const app = require('./app');
const cloudinary = require('cloudinary');
const mongoose = require('./database/database');

// import app from "./app.js";
// import cloudinary from "cloudinary";



cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_CECRET,
});


app.listen(process.env.PORT, () =>{
    console.log(`Server running on port ${process.env.PORT}`);
})


app.get('/', (req, res) =>{
    res.send('Hello world');
})




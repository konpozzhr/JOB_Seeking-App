const mongoose = require('mongoose');



const dbConnection = () =>{
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log(`\nConnect to database successfully`))
        .catch((err) => console.log(`\nError connect to database : ${err}`));
}






module.exports = dbConnection;
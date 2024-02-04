const express = require('express');
const userRouter = express.Router();
const { register }  = require('../controllers/userController');



userRouter.get('/', (req, res) =>{
    res.send("hello from user");
});

userRouter.post('/register', register);




module.exports = userRouter;
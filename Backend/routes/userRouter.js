const express = require('express');
const userRouter = express.Router();
const { register, login, logout, getUser }  = require('../controllers/userController');
const { isAuthorized } = require('../middlewares/auth');



userRouter.get('/', (req, res) =>{
    res.send("hello from user");
});

userRouter.post('/register', register);

userRouter.post('/login', login);
userRouter.post('/logout', isAuthorized, logout);
userRouter.get('/getuser', isAuthorized, getUser);



module.exports = userRouter;
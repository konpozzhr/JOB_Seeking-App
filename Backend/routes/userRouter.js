const express = require('express');
const userRouter = express.Router();
const { register, login, logout, getUser, resetPassword }  = require('../controllers/userController');
const { isAuthorized } = require('../middlewares/auth');
// const cors = require('cors');




// userRouter.use(cors());

userRouter.get('/', (req, res) =>{
    res.send("hello from user");
});

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', isAuthorized, logout);
userRouter.get('/getuser', isAuthorized, getUser);
userRouter.post('/resetpassword', resetPassword);



module.exports = userRouter;
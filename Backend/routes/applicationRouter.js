const express = require('express');
const appRouter = express.Router();
const {
        empGetAllApplication, 
        jobSeekerApplication, 
        jobSeekerDeleteApplication 
    } = require('../controllers/applicationController');
const { isAuthorized } = require('../middlewares/auth');


appRouter.get('/', (req, res) =>{
    res.send('hello from Application');
});

appRouter.get('/getall/emp',isAuthorized, empGetAllApplication);
appRouter.get('/getall/seeker', isAuthorized, jobSeekerApplication);
appRouter.delete('/delete/apps/:id', isAuthorized, jobSeekerDeleteApplication);


module.exports = appRouter;

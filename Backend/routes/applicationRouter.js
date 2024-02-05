const express = require('express');
const appRouter = express.Router();
const {
        empGetAllApplication, 
        jobSeekerApplication, 
        jobSeekerDeleteApplication,
        postApplication
    } = require('../controllers/applicationController');
const { isAuthorized } = require('../middlewares/auth');


appRouter.get('/', (req, res) =>{
    res.send('hello from Application');
});

appRouter.get('/getall/emp',isAuthorized, empGetAllApplication);
appRouter.get('/getall/seeker', isAuthorized, jobSeekerApplication);
appRouter.delete('/delete/apps/:id', isAuthorized, jobSeekerDeleteApplication);
appRouter.post('/post/application', isAuthorized, postApplication);


module.exports = appRouter;

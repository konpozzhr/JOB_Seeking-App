const express = require('express');
const jobRouter = express.Router();
const { 
    getAllJobs, 
    postJob, 
    getmyJobs, 
    updateJob, 
    deleteJob,
    getSingleJob
    } = require('../controllers/jobController');

const { isAuthorized } = require('../middlewares/auth');

jobRouter.get('/', (req, res) =>{
    res.send('hello from job');
});


jobRouter.get('/getAll', isAuthorized ,getAllJobs);
jobRouter.post('/post', isAuthorized ,postJob);
jobRouter.get('/myjob', isAuthorized, getmyJobs);
jobRouter.put('/updateJob/:id', isAuthorized, updateJob);
jobRouter.delete('/deleteJob/:id', isAuthorized, deleteJob);
jobRouter.get('/details/:id', getSingleJob)



module.exports = jobRouter;


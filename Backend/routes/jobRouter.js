const express = require('express');
const jobRouter = express.Router();
const { 
    getAllJobs, 
    postJob, 
    getmyJobs, 
    updateJob, 
    deleteJob 
    } = require('../controllers/jobController');

const { isAuthorized } = require('../middlewares/auth');

jobRouter.get('/', (req, res) =>{
    res.send('hello from job');
});


jobRouter.get('/getAll', getAllJobs);
jobRouter.post('/post', isAuthorized ,postJob);
jobRouter.get('/myjob', isAuthorized, getmyJobs);
jobRouter.put('/updateJob/:id', isAuthorized, updateJob);
jobRouter.delete('/deleteJob/:id', isAuthorized, deleteJob);



module.exports = jobRouter;


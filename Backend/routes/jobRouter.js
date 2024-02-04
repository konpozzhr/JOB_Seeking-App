const express = require('express');
const jobRouter = express.Router();
const { getAllJobs, postJob } = require('../controllers/jobController');
const { isAuthorized } = require('../middlewares/auth');

jobRouter.get('/', (req, res) =>{
    res.send('hello from job');
});


jobRouter.get('/getAll', getAllJobs);
jobRouter.post('/post', isAuthorized ,postJob);

module.exports = jobRouter;


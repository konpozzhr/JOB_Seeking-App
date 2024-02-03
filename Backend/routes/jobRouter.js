const express = require('express');
const jobRouter = express.Router();

jobRouter.get('/', (req, res) =>{
    res.send('hello from job');
});


module.exports = jobRouter;


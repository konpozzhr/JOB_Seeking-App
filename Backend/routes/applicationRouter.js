const express = require('express');
const appRouter = express.Router();

appRouter.get('/', (req, res) =>{
    res.send('hello from Application');
});




module.exports = appRouter;
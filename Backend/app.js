const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const userRouter = require('./routes/userRouter');
const jobRouter = require('./routes/jobRouter');
const appRouter = require('./routes/applicationRouter');
const dbConnection = require('./database/database');
const errorMiddleware = require('./middlewares/error');

const app = express();
dotenv.config({path: './config/config.env'});

app.use(cors({                                             // Middleware cors for allow access from frontend
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,   
}));


app.use(cookieParser());
app.use(express.json());    
app.use(express.urlencoded({extended: true}));

app.use(fileUpload({                                        // Middleware file upload 
    useTempFiles: true, 
    tempFileDir: "/tmp/",
}));



//                                                                    Call routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/job', jobRouter);
app.use('/api/v1/app',appRouter);

dbConnection();                                           // Call database connection 
app.use(errorMiddleware);




// app.use(errorMiddleware);



module.exports = app;
// export default app;
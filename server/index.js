// server/index.js

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import UserRoute from './routes/UserRoute.js';
import PostRoute from './routes/PostRoute.js';
import AuthRoute from './routes/AuthRoute.js';
import ReplyRoute from './routes/ReplyRoute.js';


//  Routes
const app = express();

app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors())

dotenv.config();
//const PORT = 3001;
const PORT = parseInt(process.env.PORT) || 3001;
const CONNECTION = "mongodb+srv://student:NewsFlash@cluster.ldaqohm.mongodb.net/?retryWrites=true&w=majority"; //put mongodb link in string

mongoose
    .connect(
        CONNECTION,
        {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(() => app.listen(PORT,
            () => console.log(`NewsFlash server is running on port: ${PORT}`)
        )
    )
    .catch((error) => console.log(`${error} did not connect`));

// Usage of Routes
app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/post', PostRoute)
app.use('/reply', ReplyRoute)
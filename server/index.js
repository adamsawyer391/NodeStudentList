import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import studentRoute from './routes/student.js';


/**
 * EXPRESS APP----------------
 */
const app = express();
const corsOptions = {
    origin : 'http://localhost:3000',
    credentials: true,
    "allowedHeaders": ["sessionId", "Content-Type"],
    "exposedHeaders": ["sessionId"],
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": true
}
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ lmit: "20mb", extended: true }));
app.use('/students', studentRoute);



/**
 * MONGO DB----------------
 */
const MONGO_CONNECTION = 'mongodb+srv://adam391:13Fire39!@cluster0.bzv7b.mongodb.net/mernstack?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;
mongoose.connect(MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => app.listen(PORT, () => console.log('Connection established with MongoDB at port number : ', PORT))).catch((err) => console.log(err.message));


import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


//import routes
import authRouter from './routes/auth.js';
import postRouter from './routes/posts.js';


const app = express();
dotenv.config();


//connect to database
mongoose.connect(process.env.DATABASE_ACCESS,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log('Connected to db'));


//middlewares...
app.use(express.json());


//routing
app.use('/auth/user', authRouter);
app.use('/api/posts', postRouter);


app.listen(3000, () => console.log('Server up and running...'));

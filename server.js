import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import EventRouter from './routes/event.js';
import  authenticate  from './middleware/authMiddleware.js';
import AuthRouter from "./routes/auth.js";
import UserGroupRouter from './routes/userGroup.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});
app.use('/auth',AuthRouter);
app.use('/userGroup',authenticate,UserGroupRouter);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

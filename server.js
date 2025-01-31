import express from 'express';
import dotenv from 'dotenv/config'
import userRroute from './routes/userRoute.js';
import noteRoute from './routes/noteRoute.js';
import mongoConnect from './config/dbConnection.js';

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use("/user", userRroute);
app.use("/note", noteRoute);

app.listen(port, () => {
  console.log(`server is listening on port : ${port}`);
})

mongoConnect();
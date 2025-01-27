import express from 'express';
import dotenv from 'dotenv/config'
import route from './routes/userRoute.js';
import mongoConnect from './config/dbConnection.js';

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use("/note", route);

app.listen(port, () => {
  console.log(`server is listening on port : ${port}`);
})

mongoConnect();



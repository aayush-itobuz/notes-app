import express from 'express';
import mongoose from 'mongoose';
import route from './routes/route.js';

const app = express();

const port = 3000;
const dbUrl =  'mongodb+srv://aayush:1234@cluster0.wty9i.mongodb.net/';

app.use(express.json());
app.use("/note", route);

app.listen(port, () => {
  console.log(`server is listening on port : ${port}`);
})

const mongoConnect = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("MongoDB onnected");
  } catch(error) {
    console.log("error occurred");
  }
}
mongoConnect();



import mongoose from "mongoose";

const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(`error occurred${error}`);
  }
}
export default mongoConnect;
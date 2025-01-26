import mongoose from "mongoose";

const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.DBURL);
    console.log("MongoDB onnected");
  } catch(error) {
    console.log(`error occurred${error}`);
  }
}
export default mongoConnect;
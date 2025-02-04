import mongoose from "mongoose";
import 'dotenv/config';

import userSchema from "../models/userSchema.js";
import noteSchema from "../models/noteSchema.js";
import { userSeed } from "./user.js";
import { noteSeed } from "./note.js";
import mongoConnect from "../config/dbConnection.js";

const createDummy = async () => {
  try {
    await mongoConnect();
  
    await userSchema.deleteMany();
    await noteSchema.deleteMany();
    console.log("cleared the database");
  
    await userSeed(10);
    await noteSeed(20);
    console.log("seeded data in the database");
    
  } catch (error) {
    console.error("Error during dummy data creation:", error);
  } finally {
    mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

createDummy();
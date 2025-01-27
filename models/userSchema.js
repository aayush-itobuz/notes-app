import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  token: {
    type: String
  },

  isVerified: {
    type: Boolean,
    default: false,
    required: true
  }
})

export default mongoose.model("user", userSchema);
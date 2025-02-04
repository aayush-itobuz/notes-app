import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true,
    select: false
  },

  isVerified: {
    type: Boolean,
    default: false,
    required: true
  },

  isLogged: {
    type: Boolean,
    default: false,
  },

  profilePic: {
    type: String,
    default: "",
  }
})

export default mongoose.model("user", userSchema);
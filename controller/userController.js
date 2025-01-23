import userSchema from "../models/userSchema.js";

// create
export const addUser = async (req, res) => {
  try{
    const {email, password} = req.body;
    const data = await userSchema.create({
      email,
      password,
    })
    if(data){
      res.json({
        status: 200,
        data:data,
        message: "user registered successfully"
      })
    }
  } catch(error) {
    res.json({
      status: 404,
      message: "error occurred during user creation"
    })
  }
}

// verification



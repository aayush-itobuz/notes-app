import noteSchema from "../models/noteSchema.js";

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.userId;
    const note = new noteSchema({
      title,
      content,
      userId,
    })

    await note.save();
    if(note){
      res.json({
        status: 200,
        data: note,
        message: "note created successfully",
      })
    }
  } catch (err) {
    console.log(err);
  }
}

export const getNote = async (req, res) => {
  try {
    const userId = req.userId;
    const note = await noteSchema.find({ userId: userId });
    if (note) {
      res.json({
        status: 200,
        data: note,
        message: "note fetched successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: 404,
      message: "error occurred during note fethcing",
    })
  }
}

export const deleteNote = async (req, res) => {
  try {
    const id = req.body._id;
    const userId = req.userId;
    const note = await noteSchema.findOneAndDelete({_id:id, userId:userId});
    if (note) {
      res.json({
        status: 200,
        message: "note deleted successfully",
        data: note,
      })
    } else {
      res.json({
        status: 404,
        message: "note not found",
      })
    }
  } catch (error) {
    res.json({
      status: 404,
      message: "note deletion failed",
      error: error.message,
    })
  }
}

export const updateNote = async (req, res) => {
  try{
    console.log("update note");
    const {id, title, content} = req.body;
    const userId = req.userId;
    const note = await noteSchema.findOneAndUpdate(
      {_id:id, userId:userId},
      {
        title: title,
        content: content,
      },
      {new: true}
    )
    if(note){
      res.json({
        status: 200,
        data:note,
        message: "data updated successfully"
      })
    } else {
      res.json({
        status: 404,
        message: "note not found", 
      })
    }
  } catch (error) {
    res.json({
      status: 404,
      message: "note updation failed",
      error: error.message,
    })
  }
}

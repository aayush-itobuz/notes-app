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
    if (note) {
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
    else {
      res.status(404).json("note not found");
    }
  } catch (error) {
    console.log(error);
    res.status(404).json("error occurred during note fethcing")
  }
}

export const getNoteById = async (req, res) => {
  try {
    const id = req.body._id;
    const userId = req.userId;
    const note = await noteSchema.findOne({ _id: id, userId: userId });
    if (note) {
      res.json({
        status: 200,
        data: note,
        message: "note fetched successfully",
      });
    }
    else {
      res.status(404).json("note not found");
    }
  } catch (error) {
    console.log(error);
    res.status(404).json("error occurred during note fethcing")
  }
}

export const search = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);

    const search = req.body.search;
    const regex = new RegExp(search, 'i');
    const note = await noteSchema.find({ title: { $regex: regex }, userId: userId })
    if (note.length > 0) {
      res.json({
        status: 200,
        data: note,
        message: "note fetched successfully",
      });
    }
    else {
      res.json("note not found");
    }
  } catch (error) {
    console.log(error);
    res.status(404).json("error occurred during note fethcing")
  }
}

export const sort = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    const note = await noteSchema.find({ userId: userId }).collation({ locale: 'en' }).sort({ title: 'asc' });
    if (note.length > 0) {
      res.json({
        status: 200,
        data: note,
        message: "note fetched successfully",
      });
    }
    else {
      res.json("note not found");
    }
  }
  catch (error) {
    console.error(error);
    res.status(500).json('An error occurred');
  }
}

export const pagination = async (req, res) => {
  try {
    const userId = req.userId;
    const { page, limit } = req.body;
    const startIndex = (page - 1) * limit;

    const note = await noteSchema.find({ userId: userId })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    if (note.length > 0) {
      res.json({
        page: page,
        limit: limit,
        data: note,
        message: "note fetched successfully",
      });
    }
    else {
      res.json("note not found");
    }
  }
  catch (error) {
    console.error(error);
    res.status(500).json('An error occurred');
  }
}

export const deleteNote = async (req, res) => {
  try {
    const id = req.body._id;
    const userId = req.userId;
    const note = await noteSchema.findOneAndDelete({ _id: id, userId: userId });
    if (note) {
      res.json({
        status: 200,
        message: "note deleted successfully",
        data: note,
      })
    } else {
      res.status(404).json("note not found");
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
  try {
    const { id, title, content } = req.body;
    const userId = req.userId;
    const note = await noteSchema.findOneAndUpdate(
      { _id: id, userId: userId },
      {
        title: title,
        content: content,
      },
      { new: true }
    )
    if (note) {
      res.json({
        status: 200,
        data: note,
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
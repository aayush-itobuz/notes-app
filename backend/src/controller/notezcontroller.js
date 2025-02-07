import noteSchema from "../src/models/noteSchema.js";

export const create = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new noteSchema({
      title,
      content,
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
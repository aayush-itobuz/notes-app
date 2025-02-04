import { faker } from "@faker-js/faker";
import noteSchema from "../models/noteSchema.js";
import userSchema from "../models/userSchema.js";

export const noteSeed = async (value) => {
  try {
    let notes = [];
    const users = await userSchema.find();

    for (let i = 0; i < value; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      let newNote = {
        userId: user._id,
        title: faker.word.sample(),
        content: faker.lorem.sentence(),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
      };
      notes.push(newNote);
    }
    await noteSchema.insertMany(notes);
  } catch (err) {
    console.log(err);
  }
};
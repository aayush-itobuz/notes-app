import { faker } from "@faker-js/faker";
import userSchema from "../models/userSchema.js";
import bcrypt from "bcrypt";

export const userSeed = async (value) => {
  try {
    let users = [];

    for (let i = 0; i < value; i++) {
      let newUser = {
        userName: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        isVerified: true,
      };
      const hashedPassword = await bcrypt.hash(newUser.password, 10);
      newUser.password = hashedPassword;

      users.push(newUser);
    }
      await userSchema.insertMany(users);
  } catch (err) {
    console.log(err);
  }
};
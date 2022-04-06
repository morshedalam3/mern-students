import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = "test";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret);

    // res.status(200).json({ result: oldUser, token });
    res.status(200).json({
      message: "User SignIn successfully",
      status: "Success",
      payload: { name: oldUser.name, email, token },
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret);

    res.status(201).json({
      message: "Account created successfully",
      status: "Success",
      payload: { email, token },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

export const AddUser = async (req, res) => {
  const { email, displayName, name } = req.body;
  const newUser = new UserModal({ email, displayName, name });
  try {
    const result = await UserModal.save(newUser);
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const upsertUser = async (req, res) => {
  const user = req.body;
  try {
    const filter = { email: user.email };
    const options = { upsert: true };
    const updateDoc = { $set: user };
    const result = await UserModal.findOneAndUpdate(filter, updateDoc, options);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const adminSet = async (req, res) => {
  const user = req.body;
  try {
    const filter = { email: user.email };
    const updateDoc = { role: "admin" };
    const result = await UserModal.findOneAndUpdate(filter, updateDoc, {
      new: true,
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const isAdmin = async (req, res) => {
  const email = req.params.email;
  try {
    const query = { email: email };
    const user = await UserModal.findOne(query);
    let isAdmin = false;
    if (user?.role === "admin") {
      isAdmin = true;
    }
    res.json({ admin: isAdmin });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

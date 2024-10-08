import mongoose from "mongoose";

const userCollection = "Users";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  age: Number,
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "Carts" },
  password: String,
  role: { type: String, default: "user" },
});

const firstCollection = mongoose.model(userCollection, userSchema);

export default firstCollection;

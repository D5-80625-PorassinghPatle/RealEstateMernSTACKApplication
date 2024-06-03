import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://images.pexels.com/photos/23531767/pexels-photo-23531767/free-photo-of-a-man-in-a-black-coat-standing-on-a-bridge.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

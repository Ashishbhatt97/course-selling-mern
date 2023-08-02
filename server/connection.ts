import mongoose from "mongoose";
require("dotenv").config();

const URL: any = process.env.DB_URI;
const connectionToDb = async () => {
  try {
    const res = await mongoose.connect(URL);
    if (res) {
      console.log("connected to DB");
    }
  } catch (er) {
    console.log(er);
  }
};

export default connectionToDb;

import mongoose from "mongoose";
async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGO_LOCAL_URL);
    console.log("mongoDB connection successfull");
  } catch (error) {
    console.log("Error connecting to mongoDB");
  }
}

export default dbConnect;

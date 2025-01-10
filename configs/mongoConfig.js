import mongoose from "mongoose";

const dbConnect = async (mongoUri, dbName) => {
  try {
    await mongoose.connect(`${mongoUri}${dbName}`);
    console.log(`Mongodb connected successfully to ${dbName}`);
  } catch (error) {
    console.error("Mongodb connection error", error?.message);
  }
};

export default dbConnect;

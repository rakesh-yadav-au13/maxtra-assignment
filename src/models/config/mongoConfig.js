import mongoose from "mongoose";
require("dotenv").config();

const mongoUri = process.env.MongoUrl;

const DbConnection = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("DataBase connected successfully");
  } catch (error) {
    console.log(error.message);
  }
};

export default DbConnection;

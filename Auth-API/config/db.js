const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    let dbURI;

    if (process.env.NODE_ENV === "production") {
      const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME, DB_PARAMS } =
        process.env;
      dbURI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?${DB_PARAMS}`;
      console.log("Environment: Production (Atlas)");
    } else {
      dbURI = "mongodb://localhost:27017/auth_app";
      console.log("Environment: Development (Local)");
    }

    const conn = await mongoose.connect(dbURI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from DB");
});

module.exports = connectDB;
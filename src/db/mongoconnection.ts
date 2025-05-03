import mongoose from "mongoose";

module.exports = function () {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    retryWrites: true,
  };

  const connectWithRetry = () => {
    console.log("Attempting to connect to MongoDB...");
    mongoose
      .connect(process.env.MONGODB_URL as string, options)
      .then(() => {
        console.log("Connected to MongoDB successfully!");
      })
      .catch((err) => {
        console.error("Failed to connect to MongoDB, retrying in 5 seconds...", err);
        setTimeout(connectWithRetry, 5000);
      });
  };

  connectWithRetry();
};
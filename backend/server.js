const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

// Handling Uncaught Exception
// console.log(reason)
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(
    `Shutting down the server due to Unhandled Exception --Reason bro`
  );
  process.exit(1);
});

// console.log(reason)

// Config
dotenv.config({ path: "backend/config/config.env" });

// Database
connectDatabase();

// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// app.listen(process.env.PORT,() => {  / If u do not use handle database string then use it instead of below line
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection / if database connection string has ant issue
// Below part is optional .. you can take it or leave it

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(
    `Shutting down the server due to Unhandled Promise Rejection --Reason bro`
  );

  server.close(() => {
    process.exit(1);
  });
});

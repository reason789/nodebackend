const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const errorMiddleware = require("./middleware/error");

// Config
dotenv.config({ path: "backend/config/config.env" }); // eta payment route add krr shomoy krsilam..tar agee drkr chilo na

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); // ey dui ta 8:3:57 te
app.use(fileUpload()); //  ey dui ta 8:3:57 te

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// Middleware for error
app.use(errorMiddleware);

module.exports = app;

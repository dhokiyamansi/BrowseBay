const express = require("express");

const connect = require("./db");

const cors = require("cors");

// imported routes
const authRoutes = require("./routes/auth");
const productAndCategoryRoutes = require("./routes/productAndCategory");
const adminRoutes = require("./routes/admin");
const addressRoutes = require("./routes/address");
const orderRoutes = require("./routes/order");
const cartRoutes = require("./routes/cart");
const payment_method = require("./routes/paymentMethod");

const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:4200",
      "https://localhost:4200",
      "http://localhost:5173",
      "https://localhost:5173",
    ],
  })
);

// database connection
connect();

// routes
app.use("/api", authRoutes);
app.use("/api", productAndCategoryRoutes);
app.use("/api", adminRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);
app.use("/api", cartRoutes);
app.use("/api", payment_method);

app.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
});

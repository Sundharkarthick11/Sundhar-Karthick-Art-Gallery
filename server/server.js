require("dotenv").config();
const adminRoutes = require("./routes/adminRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const cloudinaryRoutes = require("./routes/cloudinaryRoutes");
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const orderRoutes = require("./routes/orderRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("🎨 Sundhar Karthick Art Gallery API is Running...");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
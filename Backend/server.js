const express = require("express");
require("dotenv").config({ quiet: true });
const { connectDatabase } = require("./models/index");
const productRoute = require("./router/product");
const storeRoute = require("./router/store");
const purchaseRoute = require("./router/purchase");
const salesRoute = require("./router/sales");
const authRoute = require("./router/auth");
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// Authentication API
app.use("/api/auth", authRoute);

// Store API
app.use("/api/store", storeRoute);

// Products API
app.use("/api/product", productRoute);

// Purchase API
app.use("/api/purchase", purchaseRoute);

// Sales API
app.use("/api/sales", salesRoute);

async function startServer() {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`B2B order portal API is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start API:", error.message);
    process.exit(1);
  }
}

startServer();

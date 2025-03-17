const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // Import cookie-parser
require("dotenv").config();

// Veritabanını bağla
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(cookieParser()); // Use cookie-parser middleware
app.get("/", (req, res) => {
    res.send("Backend Çalışıyor!");
  });

// Rotalar
app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 3080;
app.listen(3080, () => console.log(`Server ${3080} portunda çalışıyor`));

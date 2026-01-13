require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const authMiddleware = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET;

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
});

app.post("/login", loginLimiter, (req, res) => {
  const { email, password } = req.body;

  if (email === "test@gmail.com" && password === "123456") {
    const token = jwt.sign({ email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.json({ token });
  }

  res.status(401).json({ message: "Sai thông tin" });
});

app.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Thông tin người dùng",
    user: req.user,
  });
});

app.get("/", (req, res) => {
  res.send("Backend version 2");
});


app.use(errorHandler);

// 🔴 BẮT BUỘC khi deploy
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

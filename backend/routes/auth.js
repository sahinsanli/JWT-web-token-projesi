const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Küçük/büyük harf uyumunu kontrol et
require("dotenv").config();

const router = express.Router();

// Middleware: Token Doğrulama
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // Extract token from cookie
  if (!token) {
    return res.status(401).json({ message: "Yetkisiz erişim, token gerekli!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token süresi dolmuş!" });
    }
    return res.status(401).json({ message: "Geçersiz token!" });
  }
};

// ✅ Kullanıcı Kaydı
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Kullanıcı var mı kontrol et
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Bu e-posta zaten kayıtlı!" });

    // Şifreyi hashle
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Yeni kullanıcı oluştur
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    // JWT Token oluştur
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // HTTP-only cookie olarak ayarla
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1 saat
      secure: process.env.NODE_ENV === "production", // HTTPS sadece üretimde
      sameSite: "strict",
    });

    res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

// ✅ Kullanıcı Girişi
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kullanıcıyı bul
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Geçersiz e-posta veya şifre!" });

    // Şifreyi karşılaştır
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Geçersiz e-posta veya şifre!" });

    // JWT Token oluştur
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // HTTP-only cookie olarak ayarla
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1 saat
      secure: process.env.NODE_ENV === "production", // HTTPS sadece üretimde
      sameSite: "strict",
    });

    // Kullanıcı bilgilerini gönder
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

// ✅ Kullanıcı Bilgilerini Getirme (Token ile)
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

module.exports = router;

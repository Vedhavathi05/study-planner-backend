
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

dotenv.config();

const { User, Subject, StudySession, Flashcard, Resource } = require("./tables.js");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });


    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer")
      return res.status(401).json({ message: "Malformed token" });

    const token = parts[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
}

app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "Name, email and password are required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already used" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.status(201).json({ message: "User registered", user: safeUser });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.json({ message: "Login successful", token, user: safeUser });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/subjects", auth, async (req, res) => {
  try {
    const subject = await Subject.create({
      userId: req.user.userId,
      title: req.body.title,
    });
    res.json(subject);
  } catch (err) {
    console.error("Create subject error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/subjects", auth, async (req, res) => {
  try {
    const subjects = await Subject.find({ userId: req.user.userId });
    res.json(subjects);
  } catch (err) {
    console.error("Get subjects error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/session", auth, async (req, res) => {
  try {
    const session = await StudySession.create({
      userId: req.user.userId,
      subjectId: req.body.subjectId,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      durationMinutes: req.body.durationMinutes,
    });
    res.json(session);
  } catch (err) {
    console.error("Create session error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/session", auth, async (req, res) => {
  try {
    const sessions = await StudySession.find({ userId: req.user.userId });
    res.json(sessions);
  } catch (err) {
    console.error("Get sessions error:", err);
    res.status(500).json({ error: err.message });
  }
});


app.post("/api/flashcards", auth, async (req, res) => {
  try {
    const card = await Flashcard.create({
      userId: req.user.userId,
      subjectId: req.body.subjectId,
      question: req.body.question,
      answer: req.body.answer,
    });

    res.json(card);
  } catch (err) {
    console.error("Create flashcard error:", err);
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/flashcards/:subjectId", auth, async (req, res) => {
  try {
    const cards = await Flashcard.find({
      userId: req.user.userId,
      subjectId: req.params.subjectId,
    });
    res.json(cards);
  } catch (err) {
    console.error("Get flashcards error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/flashcards/:id", auth, async (req, res) => {
  try {
    const updated = await Flashcard.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId,
      },
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("Update flashcard error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/flashcards/:id", auth, async (req, res) => {
  try {
    await Flashcard.deleteOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    res.json({ message: "Flashcard deleted" });
  } catch (err) {
    console.error("Delete flashcard error:", err);
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/resources", auth, async (req, res) => {
  try {
    const resource = await Resource.create({
      userId: req.user.userId,
      subjectId: req.body.subjectId,
      title: req.body.title,
      url: req.body.url,
    });

    res.json(resource);
  } catch (err) {
    console.error("Create resource error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/resources/:subjectId", auth, async (req, res) => {
  try {
    const resources = await Resource.find({
      userId: req.user.userId,
      subjectId: req.params.subjectId,
    });

    res.json(resources);
  } catch (err) {
    console.error("Get resources error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/resources/:id", auth, async (req, res) => {
  try {
    const updated = await Resource.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("Update resource error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/resources/:id", auth, async (req, res) => {
  try {
    await Resource.deleteOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    res.json({ message: "Resource deleted" });
  } catch (err) {
    console.error("Delete resource error:", err);
    res.status(500).json({ error: err.message });
  }
});

mongoose
  .connect(process.env.MONGO_URI, {

    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("Mongo Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

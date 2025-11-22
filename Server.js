const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://startling-queijadas-a48bd5.netlify.app" 
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/subjects", require("./routes/subjectRoutes"));
app.use("/api/session", require("./routes/sessionRoutes"));
app.use("/api/flashcards", require("./routes/flashcardRoutes"));
app.use("/api/resources", require("./routes/resourceRoutes"));

app.get("/", (req, res) => {
  res.send("Backend is running successfully ✔️");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

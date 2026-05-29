const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    'https://datascientists.bt',
    'https://bds-project.onrender.com',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// REMOVED app.options('*', cors()); ← this was causing the crash

app.use(express.json());
app.use(express.static("."));

app.post("/chat", async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.GROQ_API_KEY
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 200,
        messages: messages
      })
    });

    const data = await response.json();
    console.log("Groq response:", JSON.stringify(data));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Health check
app.get("/", (req, res) => {
  res.send("MGTnext AI Backend Running 🚀");
});

// AI Chat Route
app.post("/api/ai", async (req, res) => {
  try {
    const userQuestion = req.body.question;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are MGTnext AI Assistant. You help students with IoT, ESP32, Arduino, sensors, pin configuration, and project ideas. Explain simply.",
        },
        { role: "user", content: userQuestion },
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "AI error occurred" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log('Server running on port ${PORT}')
);
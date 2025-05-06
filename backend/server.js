const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Chat Schema & Model
const chatSchema = new mongoose.Schema({
  question: String,
  answer: String,
  timestamp: { type: Date, default: Date.now },
});

const Chat = mongoose.model("Chat", chatSchema);

// Save chat history
app.post("/api/history", async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newChat = new Chat({ question, answer });
    await newChat.save();
    res.status(201).json({ message: "Chat saved" });
  } catch (err) {
    res.status(500).json({ error: "Error saving chat" });
  }
});

// DELETE endpoint for history items
app.delete("/api/history/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    
    const deletedChat = await Chat.findByIdAndDelete(id);
    if (!deletedChat) {
      return res.status(404).json({ error: "Chat not found" });
    }
    
    res.json({ message: "Chat deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting chat" });
  }
});

app.get("/api/history", async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    
    if (search) {
      query = {
        $or: [
          { question: { $regex: search, $options: "i" } },
          { answer: { $regex: search, $options: "i" } }
        ]
      };
    }
    
    const chats = await Chat.find(query)
      .sort({ timestamp: -1 })
      .limit(20);
      
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving history" });
  }
});

// clear all history 
app.delete("/api/history", async (req, res) => {
  try {
    await Chat.deleteMany({});
    res.json({ message: "All chat history cleared" });
  } catch (err) {
    res.status(500).json({ error: "Error clearing history" });
  }
});

// Serve frontend build
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
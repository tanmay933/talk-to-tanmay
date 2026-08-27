import express from "express";
import cors from "cors";
import { PORT } from "./config/env.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Talk to Tanmay backend is running!"
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});

app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
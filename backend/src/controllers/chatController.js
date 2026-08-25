import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { generateResponse } from "../services/llmService.js";
import { findProfile } from "../services/profileService.js";
import { tanmayPersonality } from "../prompts/personality.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tanmayPath = path.join(__dirname, "../../../data/private/tanmay.json");

const tanmay = JSON.parse(fs.readFileSync(tanmayPath, "utf-8"));

export async function chat(req, res) {
  try {
    const { name, message, history } = req.body;

    if (!name || !message) {
      return res.status(400).json({
        error: "Name and message are required",
      });
    }

    const profile = findProfile(name);

    const response = await generateResponse({
      message,
      personality: tanmayPersonality,
      tanmay,
      profile,
      history,
    });

    res.json({
      response,
      detectedRelationship: profile.relationship,
    });
  } catch (error) {
    console.error("LLM ERROR:", error);

    res.status(500).json({
      error: "Failed to generate response",
    });
  }
}

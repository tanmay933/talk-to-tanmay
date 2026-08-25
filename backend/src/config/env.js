import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 8000;
export const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
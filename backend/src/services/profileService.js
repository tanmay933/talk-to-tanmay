import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const privateDataPath = path.join(
    __dirname,
    "../../../data/private"
);

export function findProfile(name) {
    const normalizedName = name.toLowerCase().trim();

    const files = fs.readdirSync(privateDataPath);

    for (const file of files) {
        if (!file.endsWith(".json")) {
            continue;
        }

        const filePath = path.join(privateDataPath, file);
        const profile = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        if (profile.aliases.includes(normalizedName)) {
            return profile;
        }
    }

    return {
        relationship: "unknown",
        tone: "normal Tanmay",
        context: []
    };
}
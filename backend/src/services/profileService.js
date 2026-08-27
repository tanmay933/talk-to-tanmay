import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const privateDataPath = path.join(
    __dirname,
    "../../../data/private"
);

function getProfiles() {
    // Production: profiles come from Render environment variable
    if (process.env.PRIVATE_PERSONAS) {
        try {
            return JSON.parse(process.env.PRIVATE_PERSONAS);
        } catch (error) {
            console.error("Failed to parse PRIVATE_PERSONAS");
            return [];
        }
    }

    // Local development: read JSON files normally
    if (!fs.existsSync(privateDataPath)) {
        return [];
    }

    const files = fs.readdirSync(privateDataPath);

    return files
        .filter((file) => file.endsWith(".json"))
        .map((file) => {
            const filePath = path.join(privateDataPath, file);
            return JSON.parse(fs.readFileSync(filePath, "utf-8"));
        });
}

export function findProfile(name) {
    const normalizedName = name.toLowerCase().trim();
    const profiles = getProfiles();

    for (const profile of profiles) {
        const aliases = profile.aliases || [];

        if (
            aliases.some(
                (alias) => alias.toLowerCase().trim() === normalizedName
            )
        ) {
            return profile;
        }
    }

    return {
        relationship: "unknown",
        tone: "normal Tanmay",
        context: []
    };
}
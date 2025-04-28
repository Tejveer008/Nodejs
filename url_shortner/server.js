import { readFile, writeFile } from "fs/promises";
import { createServer } from "http";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3001;
const DATA_FILE = path.join(__dirname, "data", "links.json");

// Helper: Serve static files
const serveFile = async (res, filepath, contentType) => {
  try {
    const data = await readFile(filepath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
};

// Helper: Load existing links from JSON file
const loadLinks = async () => {
  try {
    const data = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(DATA_FILE, JSON.stringify({}));
      return {};
    }
    throw error;
  }
};

// Helper: Save updated links to JSON file
const saveLinks = async (links) => {
  try {
    await writeFile(DATA_FILE, JSON.stringify(links, null, 2), "utf-8");
    console.log("✅ Links saved successfully.");
  } catch (err) {
    console.error("❌ Error writing file:", err);
  }
};

// Create server
const server = createServer(async (req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      return serveFile(res, path.join(__dirname, "public", "index.html"), "text/html");
    } else if (req.url === "/script.js") {
      return serveFile(res, path.join(__dirname, "public", "script.js"), "application/javascript");
    }
  }

  if (req.method === "POST" && req.url === "/shorten") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const { url, shortCode } = JSON.parse(body);

        if (!url) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          return res.end("URL is required.");
        }

        const links = await loadLinks();

        const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

        if (links[finalShortCode]) {
          res.writeHead(409, { "Content-Type": "text/plain" });
          return res.end("Short code already exists. Please choose another.");
        }

        links[finalShortCode] = url;
        await saveLinks(links);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ shortCode: finalShortCode }));
      } catch (error) {
        console.error("❌ Error handling request:", error);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal server error.");
      }
    });
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

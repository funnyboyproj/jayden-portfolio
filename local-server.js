const http = require("http");
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".mkv": "video/x-matroska",
  ".mov": "video/quicktime",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".webp": "image/webp"
};

http.createServer((request, response) => {
  let urlPath = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  if (urlPath === "/") urlPath = "/index.html";

  const filePath = path.resolve(root, "." + urlPath);
  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end();
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(error.code === "ENOENT" ? 404 : 500);
      response.end();
      return;
    }

    response.writeHead(200, {
      "Content-Type": contentTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream"
    });
    response.end(data);
  });
}).listen(4173, "127.0.0.1");

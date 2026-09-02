const crypto = require("crypto");
const fs = require("fs");
const fsp = require("fs/promises");
const http = require("http");
const https = require("https");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");

const root = __dirname;
const adminRoot = path.join(root, "admin");
const contentPath = path.join(root, "content-overrides.json");
const privatePath = path.join(root, "admin-private.json");
const imageRoot = path.join(root, "web-images");
const indexPath = path.join(root, "index.html");
const appPath = path.join(root, "app-v2.js");
const ffmpeg = "Q:\\Codex\\tools\\ffmpeg\\ffmpeg-9.0.1-essentials_build\\bin\\ffmpeg.exe";
const portableGitRoot = "C:\\Users\\guany\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\native\\git";
const portableGit = path.join(portableGitRoot, "cmd", "git.exe");
const port = 4174;

const types = { ".css": "text/css; charset=utf-8", ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8" };
const defaultContent = { version: 1, translations: {}, cards: {}, customModules: [], hiddenModules: [] };

function decode(value = "") {
  return value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

function attrs(source = "") {
  const result = {};
  for (const match of source.matchAll(/([:\w-]+)="([^"]*)"/g)) result[match[1]] = decode(match[2]);
  return result;
}

function text(source = "") { return decode(source.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()); }

async function readJson(file, fallback) {
  try { return JSON.parse(await fsp.readFile(file, "utf8")); } catch { return fallback; }
}

async function writeJson(file, data) {
  const temp = `${file}.${Date.now()}.tmp`;
  await fsp.writeFile(temp, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  await fsp.rename(temp, file);
}

async function extractBaseContent() {
  const [html, app, overrides] = await Promise.all([fsp.readFile(indexPath, "utf8"), fsp.readFile(appPath, "utf8"), readJson(contentPath, defaultContent)]);
  const translations = {};
  for (const match of app.matchAll(/"([^"\n]+)":\s*\{\s*zh:\s*"([\s\S]*?)",\s*en:\s*"([\s\S]*?)"\s*\}/g)) {
    translations[match[1]] = { zh: decode(match[2]), en: decode(match[3]) };
  }
  Object.assign(translations, overrides.translations || {});

  const modules = [];
  for (const section of html.matchAll(/<section\b([^>]*data-screen="([^"]+)"[^>]*)>([\s\S]*?)<\/section>/g)) {
    const sectionAttrs = attrs(section[1]);
    const id = section[2];
    const body = section[3];
    const defaultLabel = translations[`nav.${id}`] || { zh: id, en: id };
    const module = { id, label: defaultLabel, headline: { zh: "", en: "" }, hint: { zh: "", en: "" }, cards: [], hidden: (overrides.hiddenModules || []).includes(id) };
    const heading = body.match(/<div class="gallery-heading[^>]*>[\s\S]*?<p([^>]*)>([\s\S]*?)<\/p>[\s\S]*?<small([^>]*)>([\s\S]*?)<\/small>/);
    if (heading) {
      const headingAttrs = attrs(heading[1]); const hintAttrs = attrs(heading[3]);
      module.headline = translations[headingAttrs["data-i18n"]] || { zh: text(heading[2]), en: text(heading[2]) };
      module.hint = translations[hintAttrs["data-i18n"]] || { zh: text(heading[4]), en: text(heading[4]) };
    }
    let index = 0;
    for (const button of body.matchAll(/<button\b([^>]*\bclass="[^"]*\bcard\b[^"]*"[^>]*)>([\s\S]*?)<\/button>/g)) {
      index += 1;
      const buttonAttrs = attrs(button[1]);
      const override = overrides.cards?.[`${id}-${String(index).padStart(2, "0")}`] || {};
      const styleImage = (buttonAttrs.style || "").match(/--art:url\('([^']+)'\)/)?.[1] || "";
      const bContent = text(button[2].match(/<b[^>]*>([\s\S]*?)<\/b>/)?.[1] || "");
      const mediaSources = (buttonAttrs["data-media-srcs"] || buttonAttrs["data-media-src"] || "").split("|").filter(Boolean);
      const typeValues = (buttonAttrs["data-media-types"] || buttonAttrs["data-media-type"] || "image").split("|");
      const card = {
        id: `${id}-${String(index).padStart(2, "0")}`,
        titleZh: buttonAttrs["data-title-zh"] || bContent,
        titleEn: buttonAttrs["data-title-en"] || bContent,
        descriptionZh: buttonAttrs["data-description-zh"] || "",
        descriptionEn: buttonAttrs["data-description-en"] || "",
        artwork: styleImage,
        mediaType: typeValues.includes("video") ? "video" : "image",
        mediaSources,
        tone: buttonAttrs["data-tone"] || "blue",
        route: buttonAttrs["data-route"] || "",
        hidden: false
      };
      module.cards.push({ ...card, ...override, id: card.id });
    }
    modules.push(module);
  }

  const customModules = (overrides.customModules || []).map((module) => ({ ...module, isCustom: true, hidden: (overrides.hiddenModules || []).includes(module.id), cards: (module.cards || []).map((card) => ({ ...card })) }));
  const contactIndex = modules.findIndex((module) => module.id === "contact");
  modules.splice(contactIndex >= 0 ? contactIndex : modules.length, 0, ...customModules);
  return { version: 1, translations, modules, customModules, hiddenModules: overrides.hiddenModules || [] };
}

function json(response, status, data) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
  response.end(JSON.stringify(data));
}

function command(args) {
  return new Promise((resolve, reject) => {
    const executable = fs.existsSync(portableGit) ? portableGit : "git";
    const child = spawn(executable, args, {
      cwd: root,
      env: { ...process.env, GIT_EXEC_PATH: path.join(portableGitRoot, "mingw64", "bin"), PATH: `${path.join(portableGitRoot, "mingw64", "bin")};${path.join(portableGitRoot, "usr", "bin")};${process.env.PATH || ""}` },
      windowsHide: true
    });
    let output = "";
    child.stdout.on("data", (chunk) => { output += chunk; });
    child.stderr.on("data", (chunk) => { output += chunk; });
    child.on("error", reject);
    child.on("close", (code) => code === 0 ? resolve(output.trim()) : reject(new Error(output.trim() || `Git 操作失败（${code}）`)));
  });
}

async function gitStatus() {
  try { return { short: (await command(["-c", "safe.directory=Q:/Codex/Portfolio webv.01", "-C", root, "log", "-1", "--oneline"])) || "尚未提交" }; } catch { return { short: "Git 状态不可用" }; }
}

function safeFilename(value) { return decodeURIComponent(value || "file").replace(/[^\w.()-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 96) || "file"; }

function readRequest(request, maxBytes) {
  return new Promise((resolve, reject) => {
    const chunks = []; let size = 0;
    request.on("data", (chunk) => { size += chunk.length; if (size > maxBytes) { reject(new Error("文件过大")); request.destroy(); return; } chunks.push(chunk); });
    request.on("end", () => resolve(Buffer.concat(chunks)));
    request.on("error", reject);
  });
}

function runFfmpeg(input, output) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(ffmpeg)) return reject(new Error("找不到图片压缩工具"));
    const child = spawn(ffmpeg, ["-y", "-i", input, "-vf", "scale='if(gt(iw,ih),min(1920,iw),-2)':'if(gt(iw,ih),-2,min(1920,ih))'", "-c:v", "libwebp", "-q:v", "82", "-compression_level", "6", output], { windowsHide: true });
    let errors = ""; child.stderr.on("data", (chunk) => { errors += chunk; }); child.on("error", reject); child.on("close", (code) => code === 0 ? resolve() : reject(new Error(errors || "图片压缩失败")));
  });
}

function hashFile(file) { return new Promise((resolve, reject) => { const hash = crypto.createHash("sha256"); fs.createReadStream(file).on("error", reject).on("data", (chunk) => hash.update(chunk)).on("end", () => resolve(hash.digest("hex"))); }); }
function hmac(key, data, encoding) { return crypto.createHmac("sha256", key).update(data, "utf8").digest(encoding); }

async function uploadR2(file, key, mime) {
  const settings = await readJson(privatePath, {});
  const required = ["accountId", "bucket", "publicBaseUrl", "accessKeyId", "secretAccessKey"];
  if (required.some((name) => !settings[name])) throw new Error("请先在“视频上传设置”完成一次 R2 连接。");
  const host = `${settings.accountId}.r2.cloudflarestorage.com`;
  const date = new Date(); const amzDate = date.toISOString().replace(/[:-]|\.\d{3}/g, ""); const day = amzDate.slice(0, 8);
  const canonicalUri = `/${settings.bucket}/${key.split("/").map(encodeURIComponent).join("/")}`;
  const payloadHash = await hashFile(file);
  const signedHeaders = "host;x-amz-content-sha256;x-amz-date";
  const canonicalHeaders = `host:${host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`;
  const scope = `${day}/auto/s3/aws4_request`;
  const canonicalRequest = `PUT\n${canonicalUri}\n\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;
  const stringToSign = `AWS4-HMAC-SHA256\n${amzDate}\n${scope}\n${crypto.createHash("sha256").update(canonicalRequest, "utf8").digest("hex")}`;
  const kDate = hmac(`AWS4${settings.secretAccessKey}`, day); const kRegion = hmac(kDate, "auto"); const kService = hmac(kRegion, "s3"); const kSigning = hmac(kService, "aws4_request");
  const signature = hmac(kSigning, stringToSign, "hex");
  const authorization = `AWS4-HMAC-SHA256 Credential=${settings.accessKeyId}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
  const size = (await fsp.stat(file)).size;
  await new Promise((resolve, reject) => {
    const request = https.request({ host, method: "PUT", path: canonicalUri, headers: { host, "content-type": mime || "application/octet-stream", "content-length": size, "x-amz-content-sha256": payloadHash, "x-amz-date": amzDate, authorization } }, (response) => {
      let body = ""; response.on("data", (chunk) => { body += chunk; }); response.on("end", () => response.statusCode >= 200 && response.statusCode < 300 ? resolve() : reject(new Error(`R2 上传失败：${response.statusCode} ${body.slice(0, 250)}`)));
    });
    request.on("error", reject); fs.createReadStream(file).on("error", reject).pipe(request);
  });
  return `${settings.publicBaseUrl.replace(/\/$/, "")}/${key.split("/").map(encodeURIComponent).join("/")}`;
}

async function serveFile(response, file) {
  try { const content = await fsp.readFile(file); response.writeHead(200, { "content-type": types[path.extname(file).toLowerCase()] || "application/octet-stream", "cache-control": "no-store" }); response.end(content); } catch { response.writeHead(404); response.end(); }
}

async function handler(request, response) {
  const url = new URL(request.url, "http://127.0.0.1");
  try {
    if (request.method === "GET" && url.pathname === "/api/content") return json(response, 200, { ...(await extractBaseContent()), r2: await readJson(privatePath, {}), git: await gitStatus() });
    if (request.method === "POST" && url.pathname === "/api/settings") { await writeJson(privatePath, JSON.parse((await readRequest(request, 1024 * 1024)).toString("utf8"))); return json(response, 200, { ok: true }); }
    if (request.method === "POST" && url.pathname === "/api/upload/image") {
      const buffer = await readRequest(request, 45 * 1024 * 1024); const extension = path.extname(safeFilename(request.headers["x-file-name"])).toLowerCase() || ".png"; const name = `admin-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`; const temp = path.join(os.tmpdir(), `${name}${extension}`); const output = path.join(imageRoot, `${name}.webp`);
      await fsp.writeFile(temp, buffer); try { await runFfmpeg(temp, output); } finally { await fsp.rm(temp, { force: true }); }
      return json(response, 200, { url: `./web-images/${path.basename(output)}` });
    }
    if (request.method === "POST" && url.pathname === "/api/upload/video") {
      const filename = safeFilename(request.headers["x-file-name"]); const temp = path.join(os.tmpdir(), `portfolio-${Date.now()}-${filename}`); const buffer = await readRequest(request, 1024 * 1024 * 1024); await fsp.writeFile(temp, buffer);
      try { const key = `portfolio/${Date.now()}-${filename}`; const urlValue = await uploadR2(temp, key, request.headers["content-type"]); return json(response, 200, { url: urlValue }); } finally { await fsp.rm(temp, { force: true }); }
    }
    if (request.method === "POST" && url.pathname === "/api/sync") {
      const output = await command(["-c", "safe.directory=Q:/Codex/Portfolio webv.01", "-C", root, "pull", "--ff-only", "origin", "main"]); return json(response, 200, { status: "已同步", message: output || "本机已经是最新版本。" });
    }
    if (request.method === "POST" && url.pathname === "/api/publish") {
      const payload = JSON.parse((await readRequest(request, 8 * 1024 * 1024)).toString("utf8"));
      await writeJson(contentPath, payload);
      const common = ["-c", "safe.directory=Q:/Codex/Portfolio webv.01", "-C", root];
      await command([...common, "add", "--", "content-overrides.json", "web-images"]);
      let committed = false;
      try { await command([...common, "diff", "--cached", "--quiet"]); } catch { await command([...common, "commit", "-m", "Update portfolio content from local studio"]); committed = true; }
      if (committed) await command([...common, "push", "origin", "main"]);
      return json(response, 200, { ok: true, commit: committed ? (await gitStatus()).short : "没有新的内容需要提交" });
    }
    if (request.method === "GET" && (url.pathname === "/" || url.pathname === "/admin" || url.pathname === "/admin/")) return serveFile(response, path.join(adminRoot, "index.html"));
    if (request.method === "GET" && url.pathname.startsWith("/admin/")) {
      const file = path.resolve(adminRoot, `.${url.pathname.slice("/admin".length)}`); if (!file.startsWith(adminRoot)) return json(response, 403, { error: "无权访问" }); return serveFile(response, file);
    }
    if (request.method === "GET" && url.pathname.startsWith("/site")) {
      const relative = url.pathname === "/site" || url.pathname === "/site/" ? "/index.html" : url.pathname.slice("/site".length);
      const file = path.resolve(root, `.${relative}`); if (!file.startsWith(root)) return json(response, 403, { error: "无权访问" }); return serveFile(response, file);
    }
    json(response, 404, { error: "没有找到此页面" });
  } catch (error) { json(response, 500, { error: error.message || "服务器错误" }); }
}

http.createServer(handler).listen(port, "127.0.0.1", () => console.log(`Portfolio Studio is ready at http://127.0.0.1:${port}/admin/`));

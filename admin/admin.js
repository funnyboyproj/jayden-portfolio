const state = { data: null, activeView: "overview", activeModule: null, dirty: false };
const editor = document.querySelector("#editor");
const pageTitle = document.querySelector("#pageTitle");
const flash = document.querySelector("#flash");
const moduleNav = document.querySelector("#moduleNav");
const cardTemplate = document.querySelector("#cardTemplate");
const syncStatus = document.querySelector("#syncStatus");
const loginDialog = document.querySelector("#loginDialog");
const loginForm = document.querySelector("#loginForm");
const loginError = document.querySelector("#loginError");
const installApp = document.querySelector("#installApp");
const localPreviewLink = document.querySelector("#localPreviewLink");
let installPrompt = null;

const request = async (url, options = {}) => {
  const response = await fetch(url, options);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "操作未完成");
  return payload;
};

function say(message, error = false) {
  flash.textContent = message;
  flash.classList.toggle("error", error);
}

function field(label, key, value, multiline = false) {
  const control = multiline ? `<textarea data-copy-key="${key}" rows="4">${escapeHtml(value || "")}</textarea>` : `<input data-copy-key="${key}" value="${escapeAttr(value || "")}" />`;
  return `<label>${label}${control}</label>`;
}

function escapeHtml(value) { return String(value).replace(/[&<>]/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;" })[char]); }
function escapeAttr(value) { return escapeHtml(value).replace(/"/g, "&quot;"); }
function titleFor(module) { return module.label?.zh || module.id; }

function markDirty() { state.dirty = true; syncStatus.textContent = "有未发布的更改"; }

function buildModuleNav() {
  moduleNav.replaceChildren();
  state.data.modules.forEach((module) => {
    const button = document.createElement("button");
    button.className = "side-button";
    button.dataset.view = "module";
    button.dataset.module = module.id;
    button.textContent = module.hidden ? `（已隐藏）${titleFor(module)}` : titleFor(module);
    button.addEventListener("click", () => showModule(module.id));
    moduleNav.append(button);
  });
}

function selectedNav(view, moduleId) {
  document.querySelectorAll(".side-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === view && (!moduleId || button.dataset.module === moduleId));
  });
}

function showOverview() {
  state.activeView = "overview"; state.activeModule = null; pageTitle.textContent = "内容总览"; selectedNav("overview");
  const cardCount = state.data.modules.reduce((sum, module) => sum + module.cards.filter((card) => !card.hidden).length, 0);
  const customCount = state.data.customModules.length;
  const mobileAddress = state.data.mobile?.addresses?.[0] || "请确认电脑与手机连接同一个 Wi-Fi";
  const mobilePin = state.data.mobile?.pin || "已连接";
  editor.innerHTML = `<div class="overview-grid">
    <article class="overview-card"><span>现有内容模块</span><b>${state.data.modules.filter((module) => !module.hidden).length}</b><span>可在左侧分类进入编辑</span></article>
    <article class="overview-card"><span>作品与项目卡片</span><b>${cardCount}</b><span>可直接替换图片、视频与中英文文案</span></article>
    <article class="overview-card"><span>自定义模块</span><b>${customCount}</b><span>新增模块会沿用现有的作品展示排版</span></article>
  </div>
  <section class="panel"><div class="panel-head"><div><h2>使用方式</h2><p>选择左侧模块编辑内容。图片上传后会自动压缩为适合网页的格式；视频通过 R2 直接上传。完成后只需点击右上角“保存并发布网站”。</p></div></div></section>
  <section class="panel mobile-connect"><div class="panel-head"><div><h2>手机连接</h2><p>电脑与手机连接同一个 Wi-Fi，并保持 Port 开启。在手机浏览器输入下面的地址，再选择“添加到主屏幕”。</p></div></div><div class="mobile-connect-grid"><label>手机访问地址<input readonly value="${escapeAttr(mobileAddress)}" /></label><label>6 位连接码<input readonly value="${escapeAttr(mobilePin)}" /></label></div><p class="security-note">GitHub 与 R2 密钥只保留在这台电脑；手机通过 Port 安全代为发布。</p></section>`;
}

function showCopy() {
  state.activeView = "copy"; state.activeModule = null; pageTitle.textContent = "全站文案"; selectedNav("copy");
  const entries = Object.entries(state.data.translations);
  editor.innerHTML = `<section class="panel"><div class="panel-head"><div><h2>中英文文案</h2><p>这里修改的是网站中固定出现的文字；作品卡片的说明请在对应模块内编辑。</p></div></div><div class="works-list">${entries.map(([key, copy]) => `<article class="work-card"><strong>${escapeHtml(key)}</strong><div class="field-grid" style="margin-top:12px">${field("中文", `zh:${key}`, copy.zh)}${field("English", `en:${key}`, copy.en)}</div></article>`).join("")}</div></section>`;
  bindCopyFields();
}

function profileCopyFields() {
  return [
    ["姓名、出生年月与年龄", "bio.identity", false],
    ["学校与专业", "bio.school", false],
    ["国籍／身份", "bio.nationality", false],
    ["语言能力", "bio.language", false],
    ["履历栏目标题", "bio.experience", false],
    ["项目经历 1", "bio.exp1", true],
    ["项目经历 2", "bio.exp2", true],
    ["项目经历 3", "bio.exp3", true],
    ["项目经历 4", "bio.exp4", true],
    ["后续内容介绍", "bio.intro", true]
  ];
}

function profilePair(label, key, multiline) {
  const copy = state.data.translations[key] || { zh: "", en: "" };
  const tag = multiline ? "textarea" : "input";
  const zh = tag === "textarea" ? `<textarea data-profile-copy="${key}" data-locale="zh" rows="3">${escapeHtml(copy.zh || "")}</textarea>` : `<input data-profile-copy="${key}" data-locale="zh" value="${escapeAttr(copy.zh || "")}" />`;
  const en = tag === "textarea" ? `<textarea data-profile-copy="${key}" data-locale="en" rows="3">${escapeHtml(copy.en || "")}</textarea>` : `<input data-profile-copy="${key}" data-locale="en" value="${escapeAttr(copy.en || "")}" />`;
  return `<div class="profile-copy-row"><strong>${escapeHtml(label)}</strong><div class="field-grid"><label>中文${zh}</label><label>English${en}</label></div></div>`;
}

function showProfileEditor(module) {
  state.activeView = "module"; state.activeModule = "profile"; pageTitle.textContent = "个人简介"; selectedNav("module", "profile");
  state.data.profile ||= { photo: "./web-images/image-064.webp", phone: "13121425198", email: "guanyue0413@gmail.com" };
  editor.innerHTML = `<section class="panel profile-editor"><div class="panel-head"><div><h2>个人照片与基本资料</h2><p>这里的修改会同时更新个人简介卡片与点击后的完整资料。</p></div><button class="secondary module-visibility" type="button">${module.hidden ? "重新显示模块" : "隐藏整个模块"}</button></div>
    <div class="profile-photo-editor"><div class="profile-photo-preview"><img src="${escapeAttr(state.data.profile.photo)}" alt="个人简介照片预览" /></div><div><label>照片网址<input data-profile-value="photo" value="${escapeAttr(state.data.profile.photo)}" /></label><label class="upload-button profile-upload">上传并压缩新照片<input id="profilePhotoUpload" type="file" accept="image/*" /></label><p>上传后会自动压缩，并保留适合竖图展示的完整比例。</p></div></div>
    <div class="field-grid profile-contact-fields"><label>微信手机号<input data-profile-value="phone" value="${escapeAttr(state.data.profile.phone || "")}" inputmode="tel" /></label><label>邮箱<input data-profile-value="email" value="${escapeAttr(state.data.profile.email || "")}" inputmode="email" /></label></div>
    <div class="profile-copy-list">${profileCopyFields().map(([label, key, multiline]) => profilePair(label, key, multiline)).join("")}</div>
  </section>`;
  editor.querySelector(".module-visibility").addEventListener("click", () => { module.hidden = !module.hidden; markDirty(); buildModuleNav(); showProfileEditor(module); });
  editor.querySelectorAll("[data-profile-value]").forEach((input) => input.addEventListener("input", () => {
    state.data.profile[input.dataset.profileValue] = input.value.trim();
    if (input.dataset.profileValue === "photo") editor.querySelector(".profile-photo-preview img").src = input.value.trim();
    markDirty();
  }));
  editor.querySelectorAll("[data-profile-copy]").forEach((input) => input.addEventListener("input", () => {
    const key = input.dataset.profileCopy;
    state.data.translations[key] ||= { zh: "", en: "" };
    state.data.translations[key][input.dataset.locale] = input.value;
    markDirty();
  }));
  editor.querySelector("#profilePhotoUpload").addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      say("正在压缩并保存个人照片…");
      const response = await fetch("/api/upload/image", { method: "POST", headers: { "x-file-name": encodeURIComponent(file.name), "content-type": "application/octet-stream" }, body: file });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "照片上传失败");
      state.data.profile.photo = result.url;
      editor.querySelector("[data-profile-value='photo']").value = result.url;
      editor.querySelector(".profile-photo-preview img").src = result.url;
      markDirty(); say("个人照片已压缩，点击“保存并发布网站”后上线。");
    } catch (error) { say(error.message, true); }
  });
}

function showModule(id) {
  const module = state.data.modules.find((item) => item.id === id);
  if (!module) return;
  if (id === "profile") return showProfileEditor(module);
  state.activeView = "module"; state.activeModule = id; pageTitle.textContent = titleFor(module); selectedNav("module", id);
  editor.replaceChildren();
  const panel = document.createElement("section"); panel.className = "panel";
  panel.innerHTML = `<div class="panel-head"><div><h2>${escapeHtml(titleFor(module))}</h2><p>编辑这个模块中的作品、说明和展示素材。移除操作不会删除本机原文件，可随时恢复。</p></div><button class="secondary module-visibility" type="button">${module.hidden ? "重新显示模块" : "隐藏整个模块"}</button></div><div class="works-list"></div><button class="secondary add-card" type="button">＋ 新增作品卡片</button>`;
  const list = panel.querySelector(".works-list");
  module.cards.forEach((card, index) => list.append(createCardEditor(module, card, index)));
  panel.querySelector(".module-visibility").addEventListener("click", () => { module.hidden = !module.hidden; markDirty(); buildModuleNav(); showModule(id); });
  panel.querySelector(".add-card").addEventListener("click", () => { module.cards.push({ id: `${module.id}-custom-${Date.now()}`, isAdded: true, titleZh: "新作品", titleEn: "New Work", descriptionZh: "", descriptionEn: "", artwork: "", mediaType: "image", mediaSources: [], tone: "blue" }); markDirty(); showModule(id); });
  editor.append(panel);
}

function createCardEditor(module, card, index) {
  const element = cardTemplate.content.firstElementChild.cloneNode(true);
  element.dataset.card = card.id;
  element.querySelector(".work-number").textContent = String(index + 1).padStart(2, "0");
  element.querySelector(".work-name").textContent = card.titleZh || card.titleEn || "未命名作品";
  element.querySelector(".work-kind").textContent = card.isAdded ? "新增加的作品" : "已有作品";
  const values = { ...card, mediaSources: (card.mediaSources || []).join("\n") };
  element.querySelectorAll("[data-field]").forEach((input) => { input.value = values[input.dataset.field] || ""; input.addEventListener("input", () => { const key = input.dataset.field; card[key] = key === "mediaSources" ? input.value.split(/\n+/).map((value) => value.trim()).filter(Boolean) : input.value; if (key === "mediaType") card.mediaTypes = (card.mediaSources || []).map(() => input.value); if (key === "mediaSources" && !card.mediaTypes?.length) card.mediaTypes = card.mediaSources.map(() => card.mediaType || "image"); element.querySelector(".work-name").textContent = card.titleZh || card.titleEn || "未命名作品"; markDirty(); }); });
  element.querySelector(".remove-card").addEventListener("click", () => { if (card.isAdded) module.cards = module.cards.filter((item) => item !== card); else card.hidden = !card.hidden; markDirty(); showModule(module.id); });
  element.querySelector(".remove-card").textContent = card.hidden ? "恢复展示" : "移除";
  element.querySelector(".image-upload").addEventListener("change", async (event) => {
    const file = event.target.files[0]; if (!file) return;
    await uploadMedia("image", file, card, element);
  });
  element.querySelector(".video-upload").addEventListener("change", async (event) => {
    const file = event.target.files[0]; if (!file) return;
    await uploadMedia("video", file, card, element);
  });
  return element;
}

async function uploadMedia(kind, file, card, element) {
  try {
    say(kind === "image" ? "正在压缩并保存图片…" : "正在上传视频到 R2，请勿关闭窗口…");
    const response = await fetch(`/api/upload/${kind}`, { method: "POST", headers: { "x-file-name": encodeURIComponent(file.name), "content-type": "application/octet-stream" }, body: file });
    const result = await response.json(); if (!response.ok) throw new Error(result.error || "上传失败");
    card.mediaType = kind;
    card.mediaSources = [...(card.mediaSources || []), result.url];
    card.mediaTypes = [...(card.mediaTypes || []), kind];
    if (!card.artwork && kind === "image") card.artwork = result.url;
    element.querySelector("[data-field='mediaType']").value = card.mediaType;
    element.querySelector("[data-field='mediaSources']").value = card.mediaSources.join("\n");
    element.querySelector("[data-field='artwork']").value = card.artwork || "";
    markDirty(); say(`${kind === "image" ? "图片已压缩" : "视频已上传"}，点击“保存并发布”后上线。`);
  } catch (error) { say(error.message, true); }
}

function showSettings() {
  state.activeView = "settings"; state.activeModule = null; pageTitle.textContent = "视频上传设置"; selectedNav("settings");
  if (!state.data.client?.local) {
    editor.innerHTML = `<section class="panel"><div class="panel-head"><div><h2>视频上传设置</h2><p>为保护 Cloudflare 密钥，这一页只能在电脑端修改。手机端仍然可以直接选择视频，由电脑上的 Port 代为上传。</p></div></div></section>`;
    return;
  }
  const setup = state.data.r2 || {};
  editor.innerHTML = `<section class="panel"><div class="panel-head"><div><h2>连接 Cloudflare R2</h2><p>这组信息只保存在这台电脑，不会上传 GitHub。完成后，视频卡片里的“上传视频到 R2”可以直接使用。</p></div></div><div class="field-grid">${field("Cloudflare Account ID", "accountId", setup.accountId || "")}${field("R2 Bucket", "bucket", setup.bucket || "jayden-portfolio-media")}</div><div class="field-grid">${field("公开媒体地址", "publicBaseUrl", setup.publicBaseUrl || "https://pub-4ccac1ee9e26469e80d086bf24ae96d7.r2.dev")}${field("R2 Access Key ID", "accessKeyId", setup.accessKeyId || "")}</div><label>R2 Secret Access Key<input type="password" data-copy-key="secretAccessKey" value="${escapeAttr(setup.secretAccessKey || "")}" autocomplete="new-password" /></label><div style="margin-top:18px"><button class="primary" id="saveR2" type="button">保存本机视频上传设置</button></div></section>`;
  editor.querySelector("#saveR2").addEventListener("click", async () => {
    const settings = {};
    editor.querySelectorAll("[data-copy-key]").forEach((input) => { settings[input.dataset.copyKey] = input.value.trim(); });
    try { await request("/api/settings", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(settings) }); state.data.r2 = settings; say("视频上传设置已只保存到这台电脑。"); } catch (error) { say(error.message, true); }
  });
}

function bindCopyFields() {
  editor.querySelectorAll("[data-copy-key]").forEach((input) => input.addEventListener("input", () => { const [locale, key] = input.dataset.copyKey.split(":"); state.data.translations[key][locale] = input.value; markDirty(); }));
}

function showCustomModuleForm() {
  state.activeView = "new-module"; pageTitle.textContent = "新增作品模块"; selectedNav("none");
  editor.innerHTML = `<section class="panel"><div class="panel-head"><div><h2>新增模块</h2><p>新模块会自动沿用现有的全屏作品展示排版，并出现在顶部导航中。</p></div></div><div class="field-grid">${field("模块中文名称", "moduleZh", "")}${field("Module name (English)", "moduleEn", "")}</div><div class="field-grid">${field("中文大标题", "headlineZh", "")}${field("English headline", "headlineEn", "")}</div><div class="field-grid">${field("中文说明", "hintZh", "", true)}${field("English description", "hintEn", "", true)}</div><button class="primary" id="createModule" type="button">创建空模块</button></section>`;
  editor.querySelector("#createModule").addEventListener("click", () => {
    const values = {}; editor.querySelectorAll("[data-copy-key]").forEach((input) => { values[input.dataset.copyKey] = input.value.trim(); });
    if (!values.moduleZh || !values.moduleEn) return say("请先填写模块的中英文名称。", true);
    const id = `custom-${Date.now()}`;
    state.data.modules.push({ id, isCustom: true, label: { zh: values.moduleZh, en: values.moduleEn }, headline: { zh: values.headlineZh || values.moduleZh, en: values.headlineEn || values.moduleEn }, hint: { zh: values.hintZh, en: values.hintEn }, cards: [], hidden: false });
    state.data.customModules.push(state.data.modules[state.data.modules.length - 1]); markDirty(); buildModuleNav(); showModule(id);
  });
}

async function publish() {
  try { syncStatus.textContent = "正在安全提交 GitHub…"; const result = await request("/api/publish", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(toPayload()) }); state.dirty = false; syncStatus.textContent = `已发布 · ${result.commit || "同步完成"}`; say("内容已提交 GitHub，Cloudflare 正在自动更新线上网页。"); } catch (error) { syncStatus.textContent = "发布未完成"; say(error.message, true); }
}

function toPayload() {
  const cards = {};
  state.data.modules.forEach((module) => module.cards.forEach((card) => { cards[card.id] = { ...card, moduleId: module.id }; }));
  return { version: 1, translations: state.data.translations, profile: state.data.profile, cards, customModules: state.data.modules.filter((module) => module.isCustom), hiddenModules: state.data.modules.filter((module) => module.hidden).map((module) => module.id) };
}

async function syncRepository() {
  try { syncStatus.textContent = "正在从 GitHub 更新…"; const result = await request("/api/sync", { method: "POST" }); syncStatus.textContent = result.status || "已同步"; say(result.message || "GitHub 内容同步完成。"); if (!state.dirty) await load(); } catch (error) { syncStatus.textContent = "同步未完成"; say(error.message, true); }
}

async function load() {
  try { syncStatus.textContent = "正在读取内容…"; state.data = await request("/api/content"); state.dirty = false; syncStatus.textContent = `本机内容已就绪 · ${state.data.git?.short || "未读取 Git"}`; buildModuleNav(); showOverview(); } catch (error) { say(error.message, true); syncStatus.textContent = "无法读取内容"; }
}

document.querySelectorAll("[data-view]").forEach((button) => button.addEventListener("click", () => ({ overview: showOverview, copy: showCopy, settings: showSettings }[button.dataset.view] || showOverview)()));
document.querySelector("#addModule").addEventListener("click", showCustomModuleForm);
document.querySelector("#publishButton").addEventListener("click", publish);
document.querySelector("#syncButton").addEventListener("click", syncRepository);
window.addEventListener("beforeunload", (event) => { if (state.dirty) { event.preventDefault(); event.returnValue = ""; } });

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
  installApp.classList.add("ready");
});

installApp.addEventListener("click", async () => {
  if (installPrompt) {
    await installPrompt.prompt();
    installPrompt = null;
    installApp.classList.remove("ready");
    return;
  }
  say(/iPhone|iPad|iPod/i.test(navigator.userAgent) ? "请点浏览器的分享按钮，再选择“添加到主屏幕”。" : "请打开浏览器菜单，选择“安装应用”或“添加到主屏幕”。");
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginError.textContent = "正在连接…";
  try {
    await request("/api/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ pin: document.querySelector("#mobilePinInput").value.trim() }) });
    loginDialog.close();
    await load();
  } catch (error) { loginError.textContent = error.message; }
});

async function start() {
  localPreviewLink.href = `${location.origin}/site/`;
  if ("serviceWorker" in navigator && window.isSecureContext) navigator.serviceWorker.register("./admin-sw.js").catch(() => {});
  try {
    const session = await request("/api/session");
    if (!session.authenticated) {
      loginDialog.showModal();
      document.querySelector("#mobilePinInput").focus();
      return;
    }
    await load();
  } catch (error) {
    say(error.message, true);
    syncStatus.textContent = "无法连接 Port";
  }
}

start();

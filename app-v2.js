let screens = Array.from(document.querySelectorAll("[data-screen]"));
let navButtons = Array.from(document.querySelectorAll("[data-target]"));
const languageToggle = document.querySelector("#languageToggle");
const themeToggle = document.querySelector("#themeToggle");
const modal = document.querySelector("#workModal");
const modalTitle = document.querySelector("#modalTitle");
const modalDescription = document.querySelector("#modalDescription");
const modalIndex = document.querySelector("#modalIndex");
const modalArt = document.querySelector("#modalArt");
const modalMedia = document.querySelector("#modalMedia");
const modalPreviewLabel = modalArt.querySelector("[data-i18n='modal.preview']");
const modalPrev = document.querySelector("#modalPrev");
const modalNext = document.querySelector("#modalNext");

let profileContent = { photo: "./web-images/image-064.webp", phone: "13121425198", email: "guanyue0413@gmail.com" };

const order = ["home", "profile", "collab", "projects", "niko", "hours", "ip", "bobb", "works", "contact"];
const labels = {
  zh: { home: "主页", profile: "个人简介", collab: "大三联创", projects: "参与项目", niko: "Niko Niko Onigiri", hours: "24小时动画挑战赛", ip: "原创IP", bobb: "BOBB", works: "个人作品&练习", contact: "联系我" },
  en: { home: "Home", profile: "About Me", collab: "Third-Year Collaboration", projects: "Projects", niko: "Niko Niko Onigiri", hours: "24 HOURS Animation Contest", ip: "Original IP", bobb: "BOBB", works: "Personal Works & Practice", contact: "Contact Me" }
};

const characterCopy = {
  bobb: {
    zh: [
      { title: "BOBB", description: "一个来自外太空的异乡人，因太空穿梭过程燃料泄漏而迫降在一陌生的星球。身为宇宙探索家，他几乎可以解决任何技术问题，却唯独对情感一窍不通，始终尝试理解喜怒哀乐为何物。" },
      { title: "MARTY no.4", description: "MARTY no.4 生活在充满机械生命体的国度，是这个机型的第四代模型。喜欢在家养花草，也喜欢到野外感受自然；一次巨响后，他在陨石坠落地点收留了一位外星人。" },
      { title: "ANGELA", description: "天使公司的实习生，日常工作是帮助需要帮助的人；满意客户越多，她的 KPI 就越接近目标。只是她好像总在帮倒忙。" },
      { title: "DAMON", description: "地狱火集团创始人兼董事长的幼子。为了帮助家族维持并扩张企业，他从集团大酒店总经理开始磨炼能力，并要微笑服务每一位客人。" },
      { title: "FISH", description: "长得非常独特，简直像从漫画里走出来的一样。不对，哥们你真是二维生物啊？" },
      { title: "ISON", description: "整条街最懂嘻哈的鸭嘴兽，努力钻研嘻哈饶舌文化，即使他不会说话。帽子是本体，交通工具是滑板。" },
      { title: "KING RETRIEVER", description: "身为汪汪国的国王，立志带领狗民找到世界上最大的骨头，实现骨头自由。" },
      { title: "LIL TREE", description: "可靠而内敛的树学长。有任何学术问题都可以请教他，只要不要带打火机靠近。" },
      { title: "LILY", description: "每到生日，大家都会装扮成她的模样到处要糖果，并把这一天称为万圣节。她虽然胆子小，却努力和大家交朋友。" },
      { title: "MEEP", description: "从海岛来到大城市留学的怪兽，脾气一点就炸。她背着的红色小书包是珍贵宝贝，谁都不能碰。" },
      { title: "RP", description: "未知生物。" }
    ],
    en: [
      { title: "BOBB", description: "An extraterrestrial explorer stranded on an unfamiliar planet after a fuel leak. He can solve almost any technical problem, yet knows nothing about emotion and keeps trying to understand joy, anger, sorrow and delight." },
      { title: "MARTY no.4", description: "MARTY no.4 is the fourth model from a land of mechanical life. He tends plants at home, enjoys nature, and once took in an alien he met at a meteorite crash site." },
      { title: "ANGELA", description: "An intern at Angel Company whose job is helping people in need. The more satisfied clients she has, the closer she is to her KPI target—although her help often goes unexpectedly wrong." },
      { title: "DAMON", description: "The youngest son of the Hellfire Group founder and chairman. To help his family maintain and expand the business, he begins by managing the group hotel—and must serve every guest with a smile." },
      { title: "FISH", description: "So unique that he seems to have stepped out of a comic. Wait—is he really a two-dimensional creature?" },
      { title: "ISON", description: "The most hip-hop platypus on the block. He studies rap culture tirelessly despite being unable to speak; his hat is part of him, and his skateboard is his transport." },
      { title: "KING RETRIEVER", description: "King of the Dog Kingdom, determined to lead his people to the world's largest bone and achieve bone freedom." },
      { title: "LIL TREE", description: "A reliable, reserved tree senior who can help with academic questions—just do not bring a lighter near him." },
      { title: "LILY", description: "On her birthday, everyone dresses like her and goes out for candy, calling the day Halloween. Though timid, she works hard to make friends." },
      { title: "MEEP", description: "A monster from an island who studies in the big city and has a very short fuse. Her little red backpack is precious—no one is allowed to touch it." },
      { title: "RP", description: "Unknown creature." }
    ]
  }
};

const translations = {
  "nav.home": { zh: "主页", en: "HOME" },
  "nav.profile": { zh: "个人简介", en: "ABOUT ME" },
  "nav.collab": { zh: "大三联创", en: "THIRD-YEAR COLLABORATION" },
  "nav.projects": { zh: "参与项目", en: "PROJECTS" },
  "nav.ip": { zh: "原创IP", en: "ORIGINAL IP" },
  "nav.works": { zh: "个人作品&练习", en: "PERSONAL WORKS & PRACTICE" },
  "nav.contact": { zh: "联系我", en: "CONTACT ME" },
  "signature": { zh: "PERSONAL PORTFOLIO　个人作品集网站", en: "PERSONAL PORTFOLIO　PERSONAL WEBSITE" },
  "bio.identity": { zh: "陈冠宇　CHIN GUAN YUE　2004年04月　22岁", en: "CHIN GUAN YUE　APRIL 2004　22 YEARS OLD" },
  "bio.school": { zh: "中国传媒大学　23级三维动画设计专业", en: "COMMUNICATION UNIVERSITY OF CHINA　3D ANIMATION DESIGN, CLASS OF 2023" },
  "bio.nationality": { zh: "马来西亚籍华裔", en: "MALAYSIAN CHINESE" },
  "bio.language": { zh: "精通中文、英文、马来文　沟通无任何障碍", en: "FLUENT IN CHINESE, ENGLISH AND MALAY" },
  "bio.phone": { zh: "微信手机号", en: "WECHAT / MOBILE" },
  "bio.email": { zh: "邮箱", en: "EMAIL" },
  "bio.experience": { zh: "项目经历", en: "PROJECT EXPERIENCE" },
  "bio.exp1": { zh: "大三联合创作：导演、分镜、建模、绑定、动画、后期剪辑", en: "Third-year collaboration: director, storyboarding, modeling, rigging, animation and post-production." },
  "bio.exp2": { zh: "参与 2026 费纳奇北京动画周比赛", en: "Participant, 2026 Feinaki Beijing Animation Week competition." },
  "bio.exp3": { zh: "为餐饮品牌 Niko Niko Onigiri 设计 IP 盲盒", en: "Designed an IP blind box for Niko Niko Onigiri." },
  "bio.exp4": { zh: "参与 2025 第23届 24 HOURS Animation Contest for Students", en: "Participant, 2025 23rd 24 HOURS Animation Contest for Students." },
  "bio.intro": { zh: "接下来是我在校内校外的项目经验、个人开发设计的原创IP、以及个人作品集展示。", en: "Explore my campus and client projects, original IP development, and personal works." },
  "collab.headline": { zh: "以笔为媒，绘就热爱与专业。", en: "Make passion and craft visible through every frame." },
  "collab.hint": { zh: "停留在任一项目上，展开它的完整画幅。", en: "Hover over any work to expand it into its full frame." },
  "tag.collab": { zh: "BLENDER & MAYA 制作", en: "MADE WITH BLENDER & MAYA" },
  "tag.blender": { zh: "BLENDER 制作", en: "MADE WITH BLENDER" },
  "tag.works": { zh: "大部分 BLENDER，部分 MAYA 和 AI", en: "MOSTLY BLENDER, SOME MAYA & AI" },
  "collab.card1": { zh: "叙事世界", en: "Narrative World" },
  "collab.card2": { zh: "角色实验", en: "Character Lab" },
  "collab.card3": { zh: "镜头片段", en: "Shot Studies" },
  "collab.card4": { zh: "动态叙事", en: "Motion Narrative" },
  "projects.headline": { zh: "Niko Niko Onigiri", en: "Niko Niko Onigiri" },
  "projects.hint": { zh: "选择一个项目，进入完整项目页。", en: "Choose a project to enter its full project page." },
  "projects.enter": { zh: "点击进入", en: "ENTER PROJECT" },
  "projects.hoursTitle": { zh: "24小时动画挑战赛", en: "24 HOURS Animation Contest" },
  "niko.headline": { zh: "Niko Niko Onigiri 餐饮品牌 IP盲盒&门头 模型设计", en: "Niko Niko Onigiri Food Brand IP Blind Box & Storefront Model Design" },
  "niko.hint": { zh: "停留在任一内容上，展开它的完整画幅。", en: "Hover over any work to expand it into its full frame." },
  "niko.card1": { zh: "饭团系列", en: "Onigiri Series" },
  "niko.card2": { zh: "鱼吃饭团系列", en: "Fish Eating Onigiri Series" },
  "niko.card3": { zh: "蛋卷饭团系列", en: "Omelette Onigiri Series" },
  "niko.card4": { zh: "天妇罗饭团系列", en: "Tempura Onigiri Series" },
  "niko.card5": { zh: "门头系列", en: "Storefront Series" },
  "niko.card6": { zh: "实体店面照片", en: "Storefront Photos" },
  "hours.headline": { zh: "24小时动画挑战赛", en: "24 HOURS Animation Contest" },
  "hours.pageTitle": { zh: "24小时动画挑战赛", en: "24 HOURS Animation Contest" },
  "hours.hint": { zh: "停留在任一内容上，展开它的完整画幅。", en: "Hover over any work to expand it into its full frame." },
  "hours.card1": { zh: "比赛组员海报", en: "Team Poster" },
  "hours.card2": { zh: "比赛成片", en: "Final Film" },
  "hours.card3": { zh: "比赛成绩", en: "Competition Result" },
  "hours.card4": { zh: "幕后影片", en: "Behind-the-Scenes Film" },
  "ip.headline": { zh: "BOBB 原创 IP", en: "BOBB Original IP" },
  "ip.hint": { zh: "点击进入完整项目。", en: "Click to enter the full project." },
  "ip.enter": { zh: "点击进入", en: "ENTER PROJECT" },
  "bobb.headline": { zh: "BOBB 原创 IP", en: "BOBB Original IP" },
  "bobb.hint": { zh: "停留在任一内容上，展开它的完整画幅。", en: "Hover over any work to expand it into its full frame." },
  "bobb.card1": { zh: "海报", en: "Poster" },
  "bobb.card2": { zh: "第一集《陌生星球》成片", en: "Episode 1: Oddland" },
  "bobb.card3": { zh: "角色展示", en: "Character Showcase" },
  "works.headline": { zh: "作品集&练习展示", en: "PORTFOLIO & PRACTICE SHOWCASE" },
  "works.hint": { zh: "点击展开后，将以全屏查看高清图片或视频。", en: "Click an expanded work to view high-resolution images or video." },
  "works.card1": { zh: "RAMPAGE RALLY 成片", en: "RAMPAGE RALLY Final Film" },
  "works.card2": { zh: "11 Second Club 比赛", en: "11 Second Club Competition" },
  "works.card3": { zh: "预告片动画练习", en: "Trailer Animation Exercise" },
  "works.card4": { zh: "AI 生成练习", en: "AI Generation Exercises" },
  "works.card5": { zh: "MAYA 动画练习", en: "MAYA Animation Exercises" },
  "works.card6": { zh: "《心动一分钟》", en: "Heartbeat in a Minute" },
  "works.card7": { zh: "人物绑定练习", en: "Character Rigging Exercises" },
  "works.card8": { zh: "动画作业", en: "Animation Assignment" },
  "works.card9": { zh: "动画练习", en: "Animation Exercises" },
  "works.card10": { zh: "单帧渲染练习", en: "Single-Frame Rendering Exercises" },
  "card.hint": { zh: "悬停 / 点击", en: "HOVER / CLICK" },
  "contact.phone": { zh: "微信手机号", en: "WECHAT / MOBILE" },
  "contact.email": { zh: "邮箱", en: "EMAIL" },
  "modal.preview": { zh: "高清预览", en: "HIGH-RES PREVIEW" },
  "modal.note": { zh: "素材加入后，此区域将播放高清图片或视频。", en: "High-resolution images or videos will play here once materials are added." }
};

let language = "zh";
try { language = localStorage.getItem("jayden-language") === "en" ? "en" : "zh"; } catch {}
let theme = "light";
try { theme = localStorage.getItem("jayden-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); } catch {}
if (!['light', 'dark'].includes(theme)) theme = 'light';
let current = "home";
let navigating = false;
let modalCards = [];
let modalItems = [];
let modalCardIndex = 0;

const publicMediaBase = "https://pub-4ccac1ee9e26469e80d086bf24ae96d7.r2.dev";
const publicMediaFiles = new Map([
  ["./assets/collab/《剪纸惊魂》 成片.mp4", "《剪纸惊魂》成片1080P版.mp4"],
  ["./assets/hours/比赛成片.mp4", "比赛成片.mp4"],
  ["./assets/hours/比赛幕后影片.mp4", "比赛幕后影片.mp4"],
  ["./assets/bobb/第一集 《陌生星球》 成片/BOBB《陌生星球》成片.mp4", "BOBB《陌生星球》成片.mp4"],
  ["./assets/practice/第11届世界渲染大赛 RAMPAGE RALLY 成片.mp4", "第11届世界渲染大赛 RAMPAGE RALLY 成片.mp4"],
  ["./assets/practice/11 Second Club比赛/2025年6月 11SecClub_Competition 对白动画短片.mp4", "2025年6月 11SecClub_Competition 对白动画短片.mp4"],
  ["./assets/practice/预告片练习.mp4", "预告片练习.mp4"],
  ["./assets/practice/MAYA 动画练习/异兽动画练习.mov", "异兽动画练习.mov"],
  ["./assets/practice/MAYA 动画练习/漂浮生物动画练习.mp4", "漂浮生物动画练习.mp4"],
  ["./assets/practice/MAYA 动画练习/立定跳远动画练习.mp4", "立定跳远动画练习.mp4"],
  ["./assets/practice/一分钟故事短片《心动一分钟》/《心动一分钟》 故事短片.mp4", "《心动一分钟》 故事短片.mp4"],
  ["./assets/practice/人物绑定练习/人物运动练习.mkv", "人物运动练习.mkv"],
  ["./assets/practice/人物绑定练习/角色介绍视频.mp4", "角色介绍视频.mp4"],
  ["./assets/practice/动画作业/《消失的BOBB》（vanishing of BOBB）.mkv", "《消失的BOBB》（vanishing of BOBB）.mkv"],
  ["./assets/practice/动画练习/bobby cat.mkv", "bobby cat.mkv"],
  ["./assets/practice/动画练习/Bobby kick something.mp4", "Bobby kick something.mp4"],
  ["./assets/practice/动画练习/bobby sword music.mp4", "bobby sword music.mp4"],
  ["./assets/practice/动画练习/bounce ball with music.mp4", "bounce ball with music.mp4"],
  ["./assets/practice/动画练习/clockwise with music.mp4", "clockwise with music.mp4"],
  ["./assets/practice/动画练习/pick up things with music.mp4", "pick up things with music.mp4"]
]);

const localMediaFiles = new Map();

function publicMediaSource(source) {
  if (localMediaFiles.has(source)) return localMediaFiles.get(source);
  const filename = publicMediaFiles.get(source);
  return filename ? `${publicMediaBase}/${encodeURIComponent(filename)}` : source;
}

function setCardMedia(card, sources, mediaTypes) {
  const cleanSources = (sources || []).filter(Boolean);
  const cleanTypes = (mediaTypes || []).filter(Boolean);
  if (cleanSources.length > 1) {
    card.dataset.mediaSrcs = cleanSources.join("|");
    delete card.dataset.mediaSrc;
  } else {
    card.dataset.mediaSrc = cleanSources[0] || "";
    delete card.dataset.mediaSrcs;
  }
  if (cleanTypes.length > 1) {
    card.dataset.mediaTypes = cleanTypes.join("|");
    delete card.dataset.mediaType;
  } else {
    card.dataset.mediaType = cleanTypes[0] || "image";
    delete card.dataset.mediaTypes;
  }
}

function updateCardLabel(card) {
  const label = card.querySelector("b");
  if (label) label.textContent = cardValue(card, "title") || "未命名作品";
}

function applyCardContent(card, content) {
  if (!content) return;
  card.dataset.titleZh = content.titleZh || card.dataset.titleZh || "";
  card.dataset.titleEn = content.titleEn || card.dataset.titleEn || card.dataset.titleZh || "";
  card.dataset.descriptionZh = content.descriptionZh || "";
  card.dataset.descriptionEn = content.descriptionEn || content.descriptionZh || "";
  if (content.artwork) card.style.setProperty("--art", `url("${content.artwork.replace(/"/g, "\\\"")}")`);
  if (content.tone) {
    card.dataset.tone = content.tone;
    card.classList.remove("blue", "violet", "warm", "mint");
    card.classList.add(content.tone);
  }
  if (content.route !== undefined) card.dataset.route = content.route || "";
  if (content.mediaSources) setCardMedia(card, content.mediaSources, content.mediaTypes || content.mediaSources.map(() => content.mediaType || "image"));
  card.hidden = Boolean(content.hidden);
  const label = card.querySelector("b");
  if (label && content.titleZh) label.removeAttribute("data-i18n");
  updateCardLabel(card);
}

function createContentCard(content, position) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = `card ${content.tone || "blue"} media-card`;
  card.dataset.adminCardId = content.id;
  card.dataset.tone = content.tone || "blue";
  card.innerHTML = `<i>${String(position).padStart(2, "0")}</i><b></b><small data-i18n="card.hint">悬停 / 点击</small>`;
  applyCardContent(card, content);
  return card;
}

function addCustomModules(modules) {
  const main = document.querySelector("main");
  const contact = main.querySelector('[data-screen="contact"]');
  modules.forEach((module, index) => {
    if (!module?.id || document.querySelector(`[data-screen="${CSS.escape(module.id)}"]`)) return;
    labels.zh[module.id] = module.label?.zh || module.id;
    labels.en[module.id] = module.label?.en || module.label?.zh || module.id;
    const section = document.createElement("section");
    section.className = "screen gallery-screen";
    section.dataset.screen = module.id;
    section.id = module.id;
    const titleId = `customTitle-${module.id}`;
    const textId = `customText-${module.id}`;
    section.innerHTML = `<div class="page-title reveal"><span>＋${String(index + 1).padStart(2, "0")}</span><h2 id="${titleId}"></h2></div><div class="gallery-heading reveal"><p></p><small id="${textId}"></small></div><div class="gallery reveal" data-description-target="${textId}"></div>`;
    section._customModule = module;
    section.hidden = Boolean(module.hidden);
    const gallery = section.querySelector(".gallery");
    (module.cards || []).forEach((card, cardIndex) => gallery.append(createContentCard(card, cardIndex + 1)));
    if (contact) main.insertBefore(section, contact); else main.append(section);
    const nav = document.querySelector("#primaryNav");
    const navButton = document.createElement("button");
    navButton.type = "button";
    navButton.dataset.target = module.id;
    navButton.innerHTML = `<span></span>`;
    nav.insertBefore(navButton, nav.querySelector('[data-target="contact"]') || null);
    const contactIndex = order.indexOf("contact");
    order.splice(contactIndex >= 0 ? contactIndex : order.length, 0, module.id);
  });
}

function applyCustomModuleLanguage() {
  document.querySelectorAll("[data-screen]" ).forEach((section) => {
    const module = section._customModule;
    if (!module) return;
    const copy = language === "zh" ? module.label?.zh : module.label?.en;
    section.querySelector("h2").textContent = copy || module.id;
    section.querySelector(".gallery-heading p").textContent = (language === "zh" ? module.headline?.zh : module.headline?.en) || copy || module.id;
    section.querySelector(".gallery-heading small").textContent = (language === "zh" ? module.hint?.zh : module.hint?.en) || "";
  });
}

function applyContentOverrides(overrides) {
  if (!overrides || typeof overrides !== "object") return;
  Object.entries(overrides.translations || {}).forEach(([key, value]) => {
    if (!value || typeof value !== "object") return;
    translations[key] = { ...(translations[key] || {}), ...value };
  });
  profileContent = { ...profileContent, ...(overrides.profile || {}) };
  const profilePhoto = document.querySelector(".asset-portrait img");
  if (profilePhoto && profileContent.photo) profilePhoto.src = profileContent.photo;
  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.href = `tel:${profileContent.phone}`;
    const value = link.querySelector("strong");
    if (value) value.textContent = profileContent.phone;
    else link.textContent = profileContent.phone;
  });
  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    link.href = `mailto:${profileContent.email}`;
    const value = link.querySelector("strong");
    if (value) value.textContent = profileContent.email;
    else link.textContent = profileContent.email;
  });
  const hiddenModules = new Set(overrides.hiddenModules || []);
  document.querySelectorAll("[data-screen]").forEach((section) => {
    const moduleId = section.dataset.screen;
    section.hidden = hiddenModules.has(moduleId);
    const gallery = section.querySelector(".gallery");
    if (!gallery) return;
    const existingCards = Array.from(gallery.querySelectorAll(":scope > .card"));
    existingCards.forEach((card, index) => {
      const cardId = `${moduleId}-${String(index + 1).padStart(2, "0")}`;
      card.dataset.adminCardId = cardId;
      applyCardContent(card, overrides.cards?.[cardId]);
    });
    Object.values(overrides.cards || {}).filter((card) => card?.isAdded && card.moduleId === moduleId).forEach((card, index) => {
      if (!gallery.querySelector(`[data-admin-card-id="${CSS.escape(card.id)}"]`)) gallery.append(createContentCard(card, existingCards.length + index + 1));
    });
  });
  addCustomModules(overrides.customModules || []);
  screens = Array.from(document.querySelectorAll("[data-screen]"));
  navButtons = Array.from(document.querySelectorAll("[data-target]"));
}

async function loadContentOverrides() {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 3500);
  try {
    const response = await fetch("./content-overrides.json", { cache: "no-store", signal: controller.signal });
    if (!response.ok) return;
    applyContentOverrides(await response.json());
  } catch {
    // The portfolio keeps its original content if the local content file is unavailable.
  } finally {
    window.clearTimeout(timeout);
  }
}

function cardValue(card, key) {
  return card.dataset[key + (language === "zh" ? "Zh" : "En")];
}

function prepareDeferredArtwork() {
  document.querySelectorAll(".deferred-gallery .card").forEach((card) => {
    const artwork = card.style.getPropertyValue("--art");
    if (!artwork) return;
    card.dataset.artwork = artwork;
    card.style.removeProperty("--art");
  });
}

function ensureCardArtwork(card) {
  if (card.dataset.artwork && !card.style.getPropertyValue("--art")) {
    card.style.setProperty("--art", card.dataset.artwork);
  }
}

function showModalCard(index) {
  if (!modalItems.length) return;
  modalCardIndex = (index + modalItems.length) % modalItems.length;
  const item = modalItems[modalCardIndex];
  const card = item.card;
  const seriesSources = (card.dataset.mediaSrcs || card.dataset.mediaSrc || "").split("|").filter(Boolean);
  const seriesIndex = modalCards.indexOf(card);
  const imageIndex = item.sourceIndex;
  modalTitle.textContent = modalItemValue(item, "title");
  modalDescription.textContent = modalItemValue(item, "description");
  const seriesLabel = (language === "zh" ? "系列 " : "SERIES ") + String(seriesIndex + 1).padStart(2, "0") + " / " + String(modalCards.length).padStart(2, "0");
  const imageLabel = seriesSources.length > 1 ? "　" + String(imageIndex + 1).padStart(2, "0") + " / " + String(seriesSources.length).padStart(2, "0") : "";
  modalIndex.textContent = seriesLabel + imageLabel;
  modalArt.className = "modal-art " + card.dataset.tone;
  modal.classList.remove("portrait-preview", "profile-info-preview", "profile-photo-preview");
  delete modal.dataset.profilePreview;
  if (modalPreviewLabel) modalPreviewLabel.textContent = translations["modal.preview"][language];
  releaseModalMedia();
  document.querySelector('.modal-copy').scrollTop = 0;
  if (item.source) {
    const media = document.createElement(item.mediaType === "video" ? "video" : "img");
    media.className = "modal-media-item";
    const setPreviewRatio = () => {
      const width = media.tagName === "VIDEO" ? media.videoWidth : media.naturalWidth;
      const height = media.tagName === "VIDEO" ? media.videoHeight : media.naturalHeight;
      if (media.isConnected && width && height) {
        modal.classList.toggle("portrait-preview", height > width);
      }
    };
    if (media.tagName === "VIDEO") {
      media.controls = true;
      media.playsInline = true;
      media.preload = "metadata";
      media.poster = card.style.getPropertyValue('--art').match(/url\(["']?(.*?)["']?\)/)?.[1] || '';
      media.addEventListener("loadedmetadata", setPreviewRatio, { once: true });
    } else {
      media.alt = modalTitle.textContent;
      media.decoding = "async";
      media.addEventListener("load", setPreviewRatio, { once: true });
    }
    media.addEventListener("error", () => {
      if (!media.isConnected) return;
      const message = document.createElement("p");
      message.className = "media-error";
      message.textContent = language === "zh" ? "暂时无法载入此素材。请检查网络，或直接打开原文件。" : "This media could not load. Check your connection or open the original file.";
      const link = document.createElement("a");
      link.href = item.source;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = language === "zh" ? "打开素材" : "Open media";
      message.append(link);
      modalMedia.append(message);
    }, { once: true });
    media.src = item.source;
    modalMedia.append(media);
    modalArt.classList.add("has-media");
  }
}

function modalItemValue(item, key) {
  const card = item.card;
  const attribute = "item" + key[0].toUpperCase() + key.slice(1) + (language === "zh" ? "Zh" : "En");
  const values = (card.dataset[attribute] || "").split("|");
  const character = card.dataset.titleZh === "角色展示" ? characterCopy.bobb[language][item.sourceIndex] : null;
  return values[item.sourceIndex] || character?.[key] || cardValue(card, key);
}

function releaseModalMedia() {
  modalMedia.querySelectorAll("video").forEach((video) => {
    video.pause();
    video.removeAttribute("src");
    video.load();
  });
  modalMedia.replaceChildren();
}

function clearModalMedia() {
  releaseModalMedia();
  modalArt.classList.remove("has-media");
  modal.classList.remove("portrait-preview", "profile-info-preview", "profile-photo-preview");
  delete modal.dataset.profilePreview;
}

function createModalItems(cards) {
  return cards.flatMap((card) => {
    const sources = (card.dataset.mediaSrcs || card.dataset.mediaSrc || "").split("|").filter(Boolean);
    const mediaTypes = (card.dataset.mediaTypes || card.dataset.mediaType || "image").split("|");
    return (sources.length ? sources : [""]).map((source, index) => {
      const mediaType = mediaTypes[index] || mediaTypes[mediaTypes.length - 1] || "image";
      return {
        card,
        source: mediaType === "video" ? publicMediaSource(source) : source,
        mediaType,
        sourceIndex: index
      };
    });
  });
}

function openProfilePreview(type) {
  const text = (key) => translations[key][language];
  modalCards = [];
  modalItems = [];
  clearModalMedia();
  modal.dataset.profilePreview = type;
  modalArt.className = "modal-art violet";

  if (type === "portrait") {
    modal.classList.add("profile-photo-preview");
    const image = document.createElement("img");
    image.className = "modal-media-item";
    image.alt = language === "zh" ? "陈冠宇个人照片" : "Portrait of Chin Guan Yue";
    image.decoding = "async";
    image.src = profileContent.photo;
    image.addEventListener("load", () => {
      if (image.isConnected && image.naturalHeight > image.naturalWidth) modal.classList.add("portrait-preview");
    }, { once: true });
    modalMedia.append(image);
    modalArt.classList.add("has-media");
    modalIndex.textContent = language === "zh" ? "个人简介 / 照片" : "ABOUT ME / PORTRAIT";
    modalTitle.textContent = language === "zh" ? "陈冠宇" : "CHIN GUAN YUE";
    modalDescription.textContent = [text("bio.identity"), text("bio.school"), text("bio.nationality"), text("bio.language")].join("\n");
    if (modalPreviewLabel) modalPreviewLabel.textContent = language === "zh" ? "完整照片" : "FULL PORTRAIT";
  } else {
    modal.classList.add("profile-info-preview");
    modalIndex.textContent = language === "zh" ? "个人简介 / 资料" : "ABOUT ME / PROFILE";
    modalTitle.textContent = language === "zh" ? "基本信息" : "PROFILE";
    modalDescription.textContent = [
      text("bio.identity"),
      text("bio.school"),
      text("bio.nationality"),
      text("bio.language"),
      "",
      text("bio.experience"),
      "• " + text("bio.exp1"),
      "• " + text("bio.exp2"),
      "• " + text("bio.exp3"),
      "• " + text("bio.exp4"),
      "",
      text("bio.phone") + "：" + profileContent.phone,
      text("bio.email") + "：" + profileContent.email,
      "",
      text("bio.intro")
    ].join("\n");
    if (modalPreviewLabel) modalPreviewLabel.textContent = language === "zh" ? "完整资料" : "FULL PROFILE";
  }

  openWorkModal();
}

function setupProfilePreviews() {
  document.querySelectorAll("[data-profile-preview]").forEach((panel) => {
    const openPreview = (event) => {
      if (event.target.closest("a")) return;
      openProfilePreview(panel.dataset.profilePreview);
    };
    panel.addEventListener("click", openPreview);
    panel.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openProfilePreview(panel.dataset.profilePreview);
    });
  });
}


// V2 keeps the authored media/content model; navigation is native vertical reading.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const v2Copy = {
  'v2.wordmark': { zh: '作品集', en: 'portfolio' },
  'v2.index': { zh: '章节目录', en: 'CHAPTERS' },
  'v2.chapters': { zh: '章节目录', en: 'CHAPTERS' },
  'v2.railNote': { zh: '一个小小的男孩，\n拥有更大的宇宙。', en: 'A SMALL\nBOY.\nA BIGGER\nUNIVERSE.' },
  'v2.homeTitle': { zh: '你好，我是\n陈冠宇', en: 'HI, IM\nJAYDEN' },
  'v2.homeCraft': { zh: '三维角色设计与动画', en: '3D CHARACTER DESIGN & ANIMATION' },
  'v2.bobbLabel': { zh: 'BOBB · 原创 IP', en: 'BOBB · ORIGINAL IP' },
  'v2.cutcraftHome': { zh: '剪纸\n惊魂', en: 'CUTCRAFT\nPHANTASM' },
  'v2.scrollTitle': { zh: '向下滑动\n继续探索', en: 'SCROLL\nTO EXPLORE' },
  'v2.footerNote': { zh: '这一章结束，故事仍在继续。', en: 'END OF THIS CHAPTER. NOT THE STORY.' },
  'v2.about': { zh: '关于我', en: 'ABOUT' },
  'v2.contact': { zh: '联系', en: 'CONTACT' },
  'v2.prologue': { zh: '主页', en: 'HOME' },
  'v2.cutcraftTitle': { zh: '《剪纸惊魂》', en: 'CUTCRAFT PHANTASM' },
  'v2.cutcraftRole': { zh: '担任导演、分镜、建模、绑定、动画、后期剪辑', en: 'Director, storyboarding, modeling, rigging, animation and editing.' },
  'v2.browse': { zh: '浏览作品', en: 'VIEW WORKS' },
  'v2.meet': { zh: '遇见', en: 'MEET' },
  'v2.enter': { zh: '进入这一话', en: 'EXPLORE CHAPTER' },
  'v2.quote': { zh: '故事，从一个角色开始。', en: 'Every story starts with a character.' },
  'v2.nextEpisode': { zh: '下一话', en: 'UP NEXT' },
  'v2.scrollHint': { zh: '向下滚动，继续阅读我的创作故事', en: 'SCROLL DOWN. THE STORY CONTINUES.' },
  'v2.backTop': { zh: '回到顶部', en: 'BACK TO TOP' },
  'v2.nextModule': { zh: '继续阅读', en: 'KEEP READING' },
  'v2.view': { zh: '点击查看完整作品', en: 'VIEW FULL WORK' },
  'v2.play': { zh: '播放影片', en: 'PLAY FILM' }
  ,'v2.darkMode': { zh: '夜间', en: 'DARK' }
  ,'v2.lightMode': { zh: '日间', en: 'LIGHT' }
};
Object.assign(translations, v2Copy);
let previousModalFocus = null;
const galleryPages = [];
const $ = (selector) => document.querySelector(selector);
const icon = (name) => { const img = document.createElement('img'); img.className = 'icon'; img.src = `./web-images/v2-${name}.svg`; img.alt = ''; return img; };
function visibleScreens() { return screens.filter((screen) => !screen.hidden); }
function chapterName(name) { return labels[language][name] || name; }
function updateTheme() {
  document.documentElement.dataset.theme = theme;
  const isDark = theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', isDark ? (language === 'zh' ? '切换到日间模式' : 'Switch to light mode') : (language === 'zh' ? '切换到夜间模式' : 'Switch to dark mode'));
  themeToggle.querySelector('span').textContent = isDark ? '☀' : '☾';
  themeToggle.querySelector('b').textContent = translations[isDark ? 'v2.lightMode' : 'v2.darkMode'][language];
  document.querySelector('meta[name="theme-color"]').content = isDark ? '#111225' : '#ffffff';
}
function goTo(name) {
  const screen = screens.find((item) => item.dataset.screen === name);
  if (!screen || screen.hidden) return;
  const target = name === 'home' ? $('#home') : screen;
  target.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
  if (location.hash !== '#' + name) history.pushState(null, '', '#' + name);
  setCurrentChapter(name);
}
function setCurrentChapter(name) {
  current = name;
  const parent = { niko: 'projects', hours: 'projects', bobb: 'ip' }[name] || name;
  navButtons.forEach((button) => {
    const selected = button.dataset.target === parent;
    button.classList.toggle('current', selected);
    if (selected) button.setAttribute('aria-current', 'location'); else button.removeAttribute('aria-current');
  });
}
function buildModuleLinks() {
  const visible = visibleScreens();
  screens.forEach((screen) => screen.querySelector('.module-next')?.remove());
  visible.forEach((screen, index) => {
    const next = visible[(index + 1) % visible.length].dataset.screen;
    const link = document.createElement('a'); link.className = 'module-next'; link.href = '#' + next;
    const label = document.createElement('span');
    const small = document.createElement('small'); small.textContent = language === 'zh' ? (next === 'home' ? '回到开端' : '故事仍在继续') : (next === 'home' ? 'BACK TO THE BEGINNING' : 'THE STORY CONTINUES');
    const title = document.createElement('strong'); title.textContent = next === 'home' ? translations['v2.backTop'][language] : `${translations['v2.nextModule'][language]} · ${chapterName(next)}`;
    label.append(small, title); link.append(label, icon('arrow')); screen.append(link);
  });
}
function decorateCards() {
  document.querySelectorAll('.gallery > .card').forEach((card) => {
    ensureCardArtwork(card);
    if (card.querySelector('.card-media')) return;
    const media = document.createElement('span'); media.className = 'card-media';
    const artwork = card.style.getPropertyValue('--art').match(/url\(["']?(.*?)["']?\)/)?.[1];
    if (artwork) {
      const img = document.createElement('img'); img.src = artwork; img.alt = ''; img.loading = 'lazy'; img.decoding = 'async'; media.append(img);
    } else {
      const sources = (card.dataset.mediaSrcs || card.dataset.mediaSrc || '').split('|').filter(Boolean);
      if (sources[0] && (card.dataset.mediaTypes || card.dataset.mediaType || '').includes('video')) {
        const video = document.createElement('video'); video.dataset.previewSrc = publicMediaSource(sources[0]); video.preload = 'none'; video.muted = true; video.playsInline = true; video.setAttribute('aria-hidden', 'true'); media.append(video);
        video.addEventListener('error', () => { video.hidden = true; }, { once: true });
      }
    }
    if ((card.dataset.mediaTypes || card.dataset.mediaType || '').includes('video')) { const play = document.createElement('span'); play.className = 'play-marker'; play.append(icon('play')); media.append(play); }
    card.prepend(media);
    const arrow = icon('arrow'); arrow.classList.add('card-arrow'); card.append(arrow);
    const hint = card.querySelector('small'); if (hint) { hint.dataset.i18n = 'v2.view'; hint.textContent = translations['v2.view'][language]; }
  });
}
function setupGalleryPages() {
  document.querySelectorAll('.gallery').forEach((gallery) => {
    const cards = Array.from(gallery.children).filter((item) => item.classList.contains('card') && !item.hidden);
    cards.forEach((card) => { card.dataset.pageEligible = 'true'; });
    if (cards.length < 2) { gallery.classList.add('page-one'); return; }
    const state = { gallery, cards, page: 0, render: null };
    const pager = document.createElement('div'); pager.className = 'comic-pager';
    const prev = document.createElement('button'); prev.type = 'button'; prev.className = 'comic-page-button'; prev.append(icon('left'));
    const status = document.createElement('span'); status.className = 'comic-page-status';
    const next = document.createElement('button'); next.type = 'button'; next.className = 'comic-page-button'; next.append(icon('right'));
    pager.append(prev, status, next); gallery.after(pager);
    state.render = () => {
      const perPage = innerWidth <= 600 ? 1 : innerWidth <= 900 ? 2 : 3;
      const total = Math.ceil(cards.length / perPage);
      state.page = Math.min(state.page, total - 1);
      cards.forEach((card, index) => {
        const position = index - state.page * perPage;
        card.hidden = position < 0 || position >= perPage;
        card.classList.remove('is-featured', 'is-side-top', 'is-side-bottom');
        if (!card.hidden) card.classList.add(['is-featured', 'is-side-top', 'is-side-bottom'][position]);
      });
      const visibleCount = Math.min(perPage, cards.length - state.page * perPage);
      gallery.classList.toggle('page-two', visibleCount === 2);
      gallery.classList.toggle('page-one', visibleCount === 1);
      status.textContent = `${String(state.page + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
      prev.disabled = state.page === 0; next.disabled = state.page === total - 1;
      prev.setAttribute('aria-label', language === 'zh' ? '上一组作品' : 'Previous works');
      next.setAttribute('aria-label', language === 'zh' ? '下一组作品' : 'Next works');
      pager.hidden = total < 2;
    };
    const step = (direction) => { state.page += direction; state.render(); animatePanels(gallery, direction); };
    prev.addEventListener('click', () => step(-1)); next.addEventListener('click', () => step(1));
    galleryPages.push(state); state.render();
  });
  let resizeFrame = 0;
  addEventListener('resize', () => { cancelAnimationFrame(resizeFrame); resizeFrame = requestAnimationFrame(() => galleryPages.forEach((state) => state.render())); }, { passive: true });
}
function animatePanels(element, direction = 1) {
  if (reducedMotion.matches || !element?.animate) return;
  element.animate([{ opacity: .25, filter: 'blur(8px)', transform: `translateX(${direction * 22}px)` }, { opacity: 1, filter: 'blur(0)', transform: 'translateX(0)' }], { duration: 430, easing: 'cubic-bezier(.16,1,.3,1)' });
}
function openWorkModal() {
  if (!modal.open) { previousModalFocus = document.activeElement; modal.showModal(); }
  document.body.classList.add('modal-open');
  const hasSeries = !modal.dataset.profilePreview && modalItems.length > 1;
  modalPrev.hidden = !hasSeries; modalNext.hidden = !hasSeries;
}
function closeWorkModal() { clearModalMedia(); modal.close(); }
function bindGallery(gallery) {
  const description = document.getElementById(gallery.dataset.descriptionTarget);
  const heading = document.getElementById(gallery.dataset.titleTarget);
  const originalDescription = description?.textContent;
  const update = (card) => {
    if (!card || card.hidden) return;
    if (description) description.textContent = cardValue(card, 'description') || originalDescription;
    if (heading) heading.textContent = cardValue(card, 'title');
  };
  gallery.addEventListener('focusin', (event) => update(event.target.closest('.card')));
  gallery.addEventListener('pointerover', (event) => update(event.target.closest('.card')));
  gallery.addEventListener('click', (event) => {
    const card = event.target.closest('.card');
    if (!card || card.hidden || !gallery.contains(card)) return;
    if (card.dataset.route) { goTo(card.dataset.route); return; }
    modalCards = Array.from(gallery.querySelectorAll('.card')).filter((item) => (item.dataset.pageEligible === 'true' || !item.hidden) && !item.dataset.route);
    modalItems = createModalItems(modalCards);
    modalCardIndex = modalItems.findIndex((item) => item.card === card);
    showModalCard(modalCardIndex); openWorkModal();
  });
}
function updateLanguage() {
  document.body.dataset.language = language;
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-i18n]').forEach((element) => { const copy = translations[element.dataset.i18n]; if (copy) element.textContent = copy[language] || copy.zh; });
  document.querySelector('.home-intro').setAttribute('aria-label', language === 'zh' ? '了解陈冠宇，前往个人简介' : 'Meet Jayden. Go to About Me.');
  document.querySelector('.wordmark').setAttribute('aria-label', language === 'zh' ? '作品集 — 返回主页' : 'portfolio — Back to Home');
  document.querySelector('.home-bobb').setAttribute('aria-label', language === 'zh' ? '查看 BOBB 原创 IP' : 'Explore BOBB original IP');
  document.querySelector('.home-cutcraft').setAttribute('aria-label', language === 'zh' ? '查看大三联创《剪纸惊魂》' : 'Explore Cutcraft Phantasm collaboration');
  document.querySelectorAll('.gallery .card').forEach(updateCardLabel);
  applyCustomModuleLanguage();
  languageToggle.textContent = language === 'zh' ? '中 / EN' : 'EN / 中';
  languageToggle.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换为中文');
  const railToggle = $('#railToggle');
  const railCollapsed = $('#reading').classList.contains('rail-collapsed');
  railToggle.setAttribute('aria-label', railCollapsed ? (language === 'zh' ? '展开章节目录' : 'Open chapter menu') : (language === 'zh' ? '收起章节目录' : 'Close chapter menu'));
  updateTheme(); galleryPages.forEach((state) => state.render());
  $('#closeModal').setAttribute('aria-label', language === 'zh' ? '关闭作品预览' : 'Close preview');
  modalPrev.setAttribute('aria-label', language === 'zh' ? '查看上一件作品' : 'Previous artwork');
  modalNext.setAttribute('aria-label', language === 'zh' ? '查看下一件作品' : 'Next artwork');
  buildModuleLinks();
  if (modal.open) { if (modal.dataset.profilePreview) openProfilePreview(modal.dataset.profilePreview); else showModalCard(modalCardIndex); }
  document.title = 'Jayden — Portfolio V2.0';
}
async function loadLocalMedia() {
  if (!['localhost', '127.0.0.1', ''].includes(location.hostname)) return;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3500);
  try {
    const response = await fetch('./web-media/manifest.json', { signal: controller.signal });
    if (!response.ok) return;
    for (const entry of await response.json()) localMediaFiles.set('./' + entry.Source.replaceAll('\\', '/'), './web-media/' + encodeURIComponent(entry.Output));
  } catch { /* Existing public media remains the fallback. */ }
  finally { clearTimeout(timeout); }
}
function setupScrollReading() {
  const chapters = visibleScreens();
  let frame = false;
  const update = () => {
    frame = false;
    const anchor = Math.min(innerHeight * .35, 280);
    let selected = chapters[0];
    for (const section of chapters) { if (section.getBoundingClientRect().top <= anchor) selected = section; }
    if (selected) setCurrentChapter(selected.dataset.screen);
    const max = document.documentElement.scrollHeight - innerHeight;
    $('#readingProgress').style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0})`;
  };
  window.addEventListener('scroll', () => { if (!frame) { frame = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  // Native scrolling is never prevented; section links are optional shortcuts.
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('revealed'); observer.unobserve(entry.target);
  }), { threshold: .06 });
  document.querySelectorAll('.gallery .card, .profile-layout > *').forEach((element) => { element.classList.add('scroll-reveal'); observer.observe(element); });
  const moduleObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    entry.target.classList.toggle('module-visible', entry.isIntersecting && entry.intersectionRatio >= .35);
  }), { threshold: [.05, .35, .7], rootMargin: '-4% 0px -4% 0px' });
  chapters.forEach((section) => { section.classList.add('module-enter'); moduleObserver.observe(section); });
  const videoObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const video = entry.target; video.src = video.dataset.previewSrc; video.preload = 'metadata'; videoObserver.unobserve(video);
  }), { rootMargin: '200px' });
  document.querySelectorAll('video[data-preview-src]').forEach((video) => videoObserver.observe(video));
  update();
}
async function bootstrapPortfolio() {
  await Promise.all([loadContentOverrides(), loadLocalMedia()]);
  Object.assign(translations, v2Copy);
  // The editable legacy hover hints are replaced by accurate V2 click instructions.
  for (const key of ['card.hint', 'collab.hint', 'niko.hint', 'bobb.hint']) translations[key] = { zh: '点击作品格，查看完整图片或视频。', en: 'Select a panel to view the full image or film.' };
  screens.forEach((screen) => { screen.removeAttribute('aria-hidden'); if (screen.dataset.screen !== 'home') screen.id = screen.dataset.screen; });
  navButtons = Array.from(document.querySelectorAll('[data-target]'));
  navButtons.forEach((button) => {
    const screen = screens.find((item) => item.dataset.screen === button.dataset.target);
    button.hidden = !screen || screen.hidden;
    button.addEventListener('click', () => goTo(button.dataset.target));
  });
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const name = link.getAttribute('href').slice(1);
    if (!screens.some((screen) => screen.dataset.screen === name)) return;
    event.preventDefault(); goTo(name);
  });
  document.querySelectorAll('[data-project-target]').forEach((button) => button.addEventListener('click', () => goTo(button.dataset.projectTarget)));
  const homeIntro = document.querySelector('.home-intro');
  homeIntro.addEventListener('click', (event) => { if (!event.target.closest('a, button')) goTo('profile'); });
  homeIntro.addEventListener('keydown', (event) => {
    if ((event.key === 'Enter' || event.key === ' ') && event.target === homeIntro) { event.preventDefault(); goTo('profile'); }
  });
  decorateCards();
  setupGalleryPages();
  document.querySelectorAll('.gallery').forEach(bindGallery);
  setupProfilePreviews();
  const railToggle = $('#railToggle');
  const readingLayout = $('#reading');
  railToggle.addEventListener('click', () => {
    const collapsed = readingLayout.classList.toggle('rail-collapsed');
    railToggle.setAttribute('aria-expanded', String(!collapsed));
    railToggle.setAttribute('aria-label', collapsed ? (language === 'zh' ? '展开章节目录' : 'Open chapter menu') : (language === 'zh' ? '收起章节目录' : 'Close chapter menu'));
    railToggle.querySelector('img').src = `./web-images/v2-${collapsed ? 'right' : 'left'}.svg`;
  });
  languageToggle.addEventListener('click', () => { language = language === 'zh' ? 'en' : 'zh'; try { localStorage.setItem('jayden-language', language); } catch {} updateLanguage(); });
  themeToggle.addEventListener('click', () => { theme = theme === 'dark' ? 'light' : 'dark'; try { localStorage.setItem('jayden-theme', theme); } catch {} updateTheme(); });
  $('#closeModal').addEventListener('click', closeWorkModal);
  modal.addEventListener('click', (event) => { if (event.target === modal) { const box = modal.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeWorkModal(); } });
  modal.addEventListener('cancel', clearModalMedia);
  modal.addEventListener('close', () => { document.body.classList.remove('modal-open'); clearModalMedia(); previousModalFocus?.focus({ preventScroll: true }); });
  modalPrev.addEventListener('click', () => showModalCard(modalCardIndex - 1));
  modalNext.addEventListener('click', () => showModalCard(modalCardIndex + 1));
  document.addEventListener('keydown', (event) => { if (!modal.open || modal.dataset.profilePreview || /INPUT|TEXTAREA|VIDEO/.test(event.target.tagName)) return; if (event.key === 'ArrowLeft') { event.preventDefault(); showModalCard(modalCardIndex - 1); } if (event.key === 'ArrowRight') { event.preventDefault(); showModalCard(modalCardIndex + 1); } });
  window.addEventListener('popstate', () => { const target = document.getElementById(location.hash.slice(1) || 'home'); target?.scrollIntoView({ behavior: 'instant' }); });
  updateTheme(); updateLanguage(); setupScrollReading();
  if (location.hash) { const target = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (target && !target.hidden) target.scrollIntoView({ behavior: 'instant' }); }
}
bootstrapPortfolio();

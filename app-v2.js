const screens = Array.from(document.querySelectorAll("[data-screen]"));
const navButtons = Array.from(document.querySelectorAll("[data-target]"));
const navControl = document.querySelector("#navControl");
const menuToggle = document.querySelector("#menuToggle");
const nextButton = document.querySelector("#nextButton");
const nextText = document.querySelector("#nextText");
const languageToggle = document.querySelector("#languageToggle");
const modal = document.querySelector("#workModal");
const modalTitle = document.querySelector("#modalTitle");
const modalDescription = document.querySelector("#modalDescription");
const modalIndex = document.querySelector("#modalIndex");
const modalArt = document.querySelector("#modalArt");
const modalMedia = document.querySelector("#modalMedia");
const modalPreviewLabel = modalArt.querySelector("[data-i18n='modal.preview']");
const modalPrev = document.querySelector("#modalPrev");
const modalNext = document.querySelector("#modalNext");
const movingLines = document.querySelector(".asset-lines");
const cursorRibbons = document.querySelector("#cursorRibbons");
const particleFog = document.querySelector("#particleFog");
const metaBalls = document.querySelector("#metaBalls");
const clickRipples = document.querySelector("#clickRipples");

let triggerNavigationRipple = () => {};

const order = ["home", "profile", "collab", "projects", "niko", "hours", "ip", "bobb", "works", "contact"];
const labels = {
  zh: { home: "首页", profile: "个人简介", collab: "大三联创", projects: "参与项目", niko: "Niko Niko Onigiri", hours: "24小时动画挑战赛", ip: "原创IP", bobb: "BOBB", works: "个人作品&练习", contact: "联系我" },
  en: { home: "Home", profile: "About Me", collab: "Collaboration", projects: "Projects", niko: "Niko Niko Onigiri", hours: "24 HOURS Animation Contest", ip: "Original IP", bobb: "BOBB", works: "Personal Works & Practice", contact: "Contact Me" }
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
  "nav.collab": { zh: "大三联创", en: "COLLABORATION" },
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
let current = "home";
let navigating = false;
let modalCards = [];
let modalItems = [];
let modalCardIndex = 0;

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

function splitContactText() {
  document.querySelectorAll("[data-split-text]").forEach((element) => {
    const text = element.textContent.trim();
    element.setAttribute("aria-label", text);
    element.replaceChildren();
    Array.from(text).forEach((character, index) => {
      const letter = document.createElement("span");
      letter.className = "split-letter";
      letter.style.setProperty("--letter-index", index);
      letter.setAttribute("aria-hidden", "true");
      letter.textContent = character === " " ? "\u00a0" : character;
      element.append(letter);
    });
  });
}

function setupDepthInteractions() {
  document.querySelectorAll(".gallery, .profile-layout").forEach((group) => {
    group.classList.add("depth-group");
    const surfaces = group.classList.contains("gallery")
      ? Array.from(group.querySelectorAll(".card"))
      : Array.from(group.querySelectorAll(".depth-surface"));

    const reset = () => {
      group.classList.remove("has-depth-focus");
      surfaces.forEach((surface) => {
        surface.classList.remove("depth-active");
        surface.style.removeProperty("--depth-rotate-x");
        surface.style.removeProperty("--depth-rotate-y");
      });
    };

    surfaces.forEach((surface) => {
      surface.classList.add("depth-surface");
      surface.addEventListener("pointerenter", (event) => {
        if (event.pointerType !== "mouse") return;
        group.classList.add("has-depth-focus");
        surfaces.forEach((item) => item.classList.toggle("depth-active", item === surface));
      });
      surface.addEventListener("pointermove", (event) => {
        if (event.pointerType !== "mouse") return;
        const rect = surface.getBoundingClientRect();
        const rotateY = ((event.clientX - rect.left) / rect.width - .5) * 8;
        const rotateX = -((event.clientY - rect.top) / rect.height - .5) * 6;
        surface.style.setProperty("--depth-rotate-x", rotateX.toFixed(2) + "deg");
        surface.style.setProperty("--depth-rotate-y", rotateY.toFixed(2) + "deg");
      });
    });
    group.addEventListener("pointerleave", reset);
  });

  document.querySelectorAll(".depth-single").forEach((surface) => {
    surface.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse") surface.classList.add("depth-active");
    });
    surface.addEventListener("pointerleave", () => {
      surface.classList.remove("depth-active");
      surface.style.removeProperty("--depth-rotate-x");
      surface.style.removeProperty("--depth-rotate-y");
    });
    surface.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse") return;
      const rect = surface.getBoundingClientRect();
      const rotateY = ((event.clientX - rect.left) / rect.width - .5) * 5;
      const rotateX = -((event.clientY - rect.top) / rect.height - .5) * 4;
      surface.style.setProperty("--depth-rotate-x", rotateX.toFixed(2) + "deg");
      surface.style.setProperty("--depth-rotate-y", rotateY.toFixed(2) + "deg");
    });
  });
}

function setupPanelGlow() {
  document.querySelectorAll(".depth-surface, .work-modal").forEach((panel) => {
    panel.classList.add("edge-glow-panel");

    if (!panel.querySelector(":scope > .panel-edge-glow")) {
      const glow = document.createElement("span");
      glow.className = "panel-edge-glow";
      glow.setAttribute("aria-hidden", "true");
      panel.prepend(glow);
    }

    panel.addEventListener("pointermove", (event) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      const bounds = panel.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100));
      const y = Math.max(0, Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100));
      const edgeDistance = Math.min(x, 100 - x, y, 100 - y);
      const strength = Math.max(0, 1 - edgeDistance / 26);

      panel.style.setProperty("--glow-x", `${x}%`);
      panel.style.setProperty("--glow-y", `${y}%`);
      panel.style.setProperty("--glow-strength", strength.toFixed(3));
    });

    panel.addEventListener("pointerleave", () => {
      panel.style.setProperty("--glow-strength", "0");
    });
  });
}

function startMetaBalls() {
  if (!metaBalls || window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const context = metaBalls.getContext("2d");
  if (!context) return;

  const palette = ["94, 87, 255", "72, 132, 255", "130, 72, 255", "62, 186, 255"];
  const pointer = { x: window.innerWidth * .52, y: window.innerHeight * .5, targetX: window.innerWidth * .52, targetY: window.innerHeight * .5 };
  let width = 0;
  let height = 0;
  let dpr = 1;
  let balls = [];

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    metaBalls.width = Math.round(width * dpr);
    metaBalls.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = width > 900 ? 12 : 8;
    balls = Array.from({ length: count }, (_, index) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 58 + Math.random() * 96,
      driftX: .18 + Math.random() * .34,
      driftY: .13 + Math.random() * .3,
      phase: Math.random() * Math.PI * 2,
      colour: palette[index % palette.length]
    }));
  };

  const paintBlob = (x, y, radius, colour, alpha) => {
    const glow = context.createRadialGradient(x, y, radius * .08, x, y, radius);
    glow.addColorStop(0, `rgba(${colour}, ${alpha})`);
    glow.addColorStop(.4, `rgba(${colour}, ${alpha * .48})`);
    glow.addColorStop(1, `rgba(${colour}, 0)`);
    context.fillStyle = glow;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  };

  const draw = (time) => {
    context.clearRect(0, 0, width, height);
    context.globalCompositeOperation = "lighter";
    balls.forEach((ball) => {
      const x = ball.x + Math.sin(time / 3100 * ball.driftX + ball.phase) * 74;
      const y = ball.y + Math.cos(time / 3700 * ball.driftY + ball.phase) * 64;
      paintBlob(x, y, ball.radius, ball.colour, .09);
    });
    pointer.x += (pointer.targetX - pointer.x) * .055;
    pointer.y += (pointer.targetY - pointer.y) * .055;
    paintBlob(pointer.x, pointer.y, 168, "102, 103, 255", .15);
    paintBlob(pointer.x - 38, pointer.y + 24, 116, "66, 184, 255", .1);
    context.globalCompositeOperation = "source-over";
    requestAnimationFrame(draw);
  };

  window.addEventListener("pointermove", (event) => {
    if (event.pointerType && event.pointerType !== "mouse") return;
    pointer.targetX = event.clientX;
    pointer.targetY = event.clientY;
  }, { passive: true });
  window.addEventListener("resize", resize, { passive: true });
  resize();
  requestAnimationFrame(draw);
}

function startClickRipples() {
  if (!clickRipples || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const context = clickRipples.getContext("2d");
  if (!context) return;

  const pointer = { x: window.innerWidth * .5, y: window.innerHeight * .5 };
  const ripples = [];
  let width = 0;
  let height = 0;
  let dpr = 1;
  let frame = 0;

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    clickRipples.width = Math.round(width * dpr);
    clickRipples.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = (time) => {
    context.clearRect(0, 0, width, height);
    const distance = Math.hypot(width, height);
    for (let index = ripples.length - 1; index >= 0; index -= 1) {
      const ripple = ripples[index];
      const progress = Math.min(1, (time - ripple.start) / 1120);
      const radius = 16 + distance * .48 * progress;
      const fade = (1 - progress) * .72;
      const wash = context.createRadialGradient(ripple.x, ripple.y, radius * .44, ripple.x, ripple.y, radius);
      wash.addColorStop(0, "rgba(92, 114, 255, 0)");
      wash.addColorStop(.7, `rgba(84, 142, 255, ${fade * .06})`);
      wash.addColorStop(.86, `rgba(148, 78, 255, ${fade * .24})`);
      wash.addColorStop(1, "rgba(96, 202, 255, 0)");
      context.fillStyle = wash;
      context.fillRect(ripple.x - radius, ripple.y - radius, radius * 2, radius * 2);
      context.lineWidth = 1.1 + (1 - progress) * 1.8;
      context.strokeStyle = `rgba(109, 208, 255, ${fade * .66})`;
      context.beginPath();
      context.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
      context.stroke();
      context.lineWidth = 1;
      context.strokeStyle = `rgba(143, 88, 255, ${fade * .48})`;
      context.beginPath();
      context.arc(ripple.x, ripple.y, radius * .78, 0, Math.PI * 2);
      context.stroke();
      if (progress >= 1) ripples.splice(index, 1);
    }
    if (ripples.length) frame = requestAnimationFrame(draw);
    else frame = 0;
  };

  const createRipple = (x = pointer.x, y = pointer.y) => {
    const start = performance.now();
    const previous = ripples[ripples.length - 1];
    if (previous && start - previous.start < 70 && Math.hypot(previous.x - x, previous.y - y) < 30) return;

    ripples.push({ x, y, start });
    if (ripples.length > 3) ripples.shift();
    if (!frame) frame = requestAnimationFrame(draw);
  };

  triggerNavigationRipple = (x, y) => createRipple(x, y);
  window.addEventListener("pointermove", (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  }, { passive: true });
  document.addEventListener("click", (event) => {
    if (event.detail === 0) return;
    createRipple(event.clientX, event.clientY);
  }, { capture: true });
  window.addEventListener("resize", resize, { passive: true });
  resize();
}

function startHomeTitleDepth() {
  const title = document.querySelector(".title-art-window");
  if (!title || !window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const currentTilt = { x: 0, y: 0 };
  const targetTilt = { x: 0, y: 0 };
  let frame = 0;

  const render = () => {
    currentTilt.x += (targetTilt.x - currentTilt.x) * .1;
    currentTilt.y += (targetTilt.y - currentTilt.y) * .1;
    title.style.setProperty("--title-rotate-x", `${currentTilt.x.toFixed(2)}deg`);
    title.style.setProperty("--title-rotate-y", `${currentTilt.y.toFixed(2)}deg`);
    if (Math.abs(targetTilt.x - currentTilt.x) > .015 || Math.abs(targetTilt.y - currentTilt.y) > .015) frame = requestAnimationFrame(render);
    else frame = 0;
  };

  const wake = () => {
    if (!frame) frame = requestAnimationFrame(render);
  };

  window.addEventListener("pointermove", (event) => {
    if (current !== "home") return;
    const bounds = title.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - (bounds.left + bounds.width / 2)) / (bounds.width * .55)));
    const y = Math.max(-1, Math.min(1, (event.clientY - (bounds.top + bounds.height / 2)) / (bounds.height * .55)));
    targetTilt.x = -y * 4.4;
    targetTilt.y = x * 6.2;
    wake();
  }, { passive: true });

  window.addEventListener("blur", () => {
    targetTilt.x = 0;
    targetTilt.y = 0;
    wake();
  });
}

function startParticleFog() {
  if (!particleFog || !window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const context = particleFog.getContext("2d");
  const colours = ["66, 53, 190", "42, 89, 202", "109, 69, 201", "49, 127, 212"];
  let width = 0;
  let height = 0;
  let dpr = 1;
  let particles = [];
  let mouse = { x: -1000, y: -1000 };
  let frame = 0;
  let active = false;

  const makeParticles = () => {
    const count = Math.min(260, Math.max(90, Math.round((width * height) / 7000)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1.5 + Math.random() * 4.5,
      colour: colours[Math.floor(Math.random() * colours.length)],
      energy: 0,
      drift: Math.random() * Math.PI * 2,
    }));
  };

  const resize = () => {
    const rect = particleFog.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    particleFog.width = Math.round(width * dpr);
    particleFog.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    makeParticles();
  };

  const draw = (time) => {
    context.clearRect(0, 0, width, height);
    let isVisible = false;

    particles.forEach((particle) => {
      particle.energy *= 0.93;
      particle.x += Math.sin(time / 1700 + particle.drift) * 0.08;
      particle.y += Math.cos(time / 1900 + particle.drift) * 0.06;

      if (particle.x < -12) particle.x = width + 12;
      if (particle.x > width + 12) particle.x = -12;
      if (particle.y < -12) particle.y = height + 12;
      if (particle.y > height + 12) particle.y = -12;

      if (particle.energy < 0.012) return;
      isVisible = true;
      const radius = particle.size + particle.energy * 17;
      const gradient = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, radius);
      gradient.addColorStop(0, `rgba(${particle.colour}, ${0.1 + particle.energy * 0.34})`);
      gradient.addColorStop(0.38, `rgba(${particle.colour}, ${particle.energy * 0.15})`);
      gradient.addColorStop(1, `rgba(${particle.colour}, 0)`);
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
      context.fill();
    });

    if (isVisible) {
      frame = requestAnimationFrame(draw);
    } else {
      active = false;
      frame = 0;
    }
  };

  const wake = () => {
    if (!active) {
      active = true;
      frame = requestAnimationFrame(draw);
    }
  };

  const energise = (x, y, amount = 1) => {
    mouse = { x, y };
    particles.forEach((particle) => {
      const distance = Math.hypot(particle.x - mouse.x, particle.y - mouse.y);
      const radius = 138 + particle.size * 2;
      if (distance < radius) {
        const strength = Math.pow(1 - distance / radius, 1.8) * amount;
        particle.energy = Math.max(particle.energy, strength);
      }
    });
    wake();
  };

  window.addEventListener("pointermove", (event) => {
    if (event.pointerType && event.pointerType !== "mouse") return;
    energise(event.clientX, event.clientY);
  }, { passive: true });

  window.addEventListener("pointerdown", (event) => {
    if (event.pointerType && event.pointerType !== "mouse") return;
    energise(event.clientX, event.clientY, 1.7);
  }, { passive: true });

  window.addEventListener("resize", resize, { passive: true });
  resize();
}

function startCursorRibbons() {
  if (!cursorRibbons || !window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const context = cursorRibbons.getContext("2d");
  if (!context) return;

  const cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false, opacity: 0 };
  const ribbons = [
    { colors: ["#3d249d", "#2d5fbb"], width: 10, offsetX: -5, offsetY: 6, points: [] },
    { colors: ["#5b338f", "#2550a2"], width: 7, offsetX: 8, offsetY: -4, points: [] },
    { colors: ["#294b98", "#533196"], width: 4, offsetX: 1, offsetY: 1, points: [] }
  ];
  let width = 0;
  let height = 0;
  let dpr = 1;

  const resetPoints = () => ribbons.forEach((ribbon) => {
    ribbon.points = Array.from({ length: 28 }, () => ({ x: cursor.x + ribbon.offsetX, y: cursor.y + ribbon.offsetY }));
  });
  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    cursorRibbons.width = Math.round(width * dpr);
    cursorRibbons.height = Math.round(height * dpr);
    cursorRibbons.style.width = width + "px";
    cursorRibbons.style.height = height + "px";
    resetPoints();
  };
  const moveCursor = (event) => {
    if (event.pointerType !== "mouse") return;
    cursor.x = event.clientX;
    cursor.y = event.clientY;
    cursor.active = true;
  };
  const draw = () => {
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);
    cursor.opacity += ((cursor.active ? 1 : 0) - cursor.opacity) * .08;
    context.globalCompositeOperation = "lighter";
    ribbons.forEach((ribbon, ribbonIndex) => {
      const head = ribbon.points[0];
      head.x += (cursor.x + ribbon.offsetX - head.x) * .38;
      head.y += (cursor.y + ribbon.offsetY - head.y) * .38;
      for (let index = 1; index < ribbon.points.length; index += 1) {
        const previous = ribbon.points[index - 1];
        const point = ribbon.points[index];
        const follow = .31 - ribbonIndex * .035;
        point.x += (previous.x - point.x) * follow;
        point.y += (previous.y - point.y) * follow;
      }
      const tail = ribbon.points[ribbon.points.length - 1];
      const gradient = context.createLinearGradient(head.x, head.y, tail.x, tail.y);
      gradient.addColorStop(0, ribbon.colors[0]);
      gradient.addColorStop(.55, ribbon.colors[1]);
      gradient.addColorStop(1, "#5e6fff00");
      context.beginPath();
      context.moveTo(head.x, head.y);
      ribbon.points.slice(1).forEach((point) => context.lineTo(point.x, point.y));
        context.globalAlpha = cursor.opacity * (ribbonIndex === 0 ? .52 : .34);
        context.lineCap = "round";
        context.lineJoin = "round";
        context.lineWidth = ribbon.width;
        context.strokeStyle = gradient;
        context.shadowBlur = ribbonIndex === 0 ? 14 : 10;
        context.shadowColor = ribbon.colors[0];
        context.stroke();

        const headGradient = context.createRadialGradient(head.x, head.y, 0, head.x, head.y, ribbon.width * 1.3);
        headGradient.addColorStop(0, ribbon.colors[1]);
        headGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        context.globalAlpha = cursor.opacity * (ribbonIndex === 0 ? .32 : .2);
        context.fillStyle = headGradient;
        context.beginPath();
        context.arc(head.x, head.y, ribbon.width * 1.3, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;
    });
    context.globalAlpha = 1;
    requestAnimationFrame(draw);
  };

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", moveCursor, { passive: true });
  window.addEventListener("blur", () => { cursor.active = false; });
  resize();
  draw();
}

function showModalCard(index) {
  if (!modalItems.length) return;
  modalCardIndex = (index + modalItems.length) % modalItems.length;
  const item = modalItems[modalCardIndex];
  const card = item.card;
  const seriesSources = (card.dataset.mediaSrcs || card.dataset.mediaSrc || "").split("|").filter(Boolean);
  const seriesIndex = modalCards.indexOf(card);
  const imageIndex = seriesSources.indexOf(item.source);
  modalTitle.textContent = modalItemValue(item, "title");
  modalDescription.textContent = modalItemValue(item, "description");
  const seriesLabel = (language === "zh" ? "系列 " : "SERIES ") + String(seriesIndex + 1).padStart(2, "0") + " / " + String(modalCards.length).padStart(2, "0");
  const imageLabel = seriesSources.length > 1 ? "　" + String(imageIndex + 1).padStart(2, "0") + " / " + String(seriesSources.length).padStart(2, "0") : "";
  modalIndex.textContent = seriesLabel + imageLabel;
  modalArt.className = "modal-art " + card.dataset.tone;
  modal.classList.remove("portrait-preview", "profile-info-preview", "profile-photo-preview");
  delete modal.dataset.profilePreview;
  if (modalPreviewLabel) modalPreviewLabel.textContent = translations["modal.preview"][language];
  modalMedia.replaceChildren();
  if (item.source) {
    const media = document.createElement(item.mediaType === "video" ? "video" : "img");
    media.className = "modal-media-item";
    if (media.tagName === "VIDEO") {
      media.controls = true;
      media.playsInline = true;
      media.preload = "metadata";
    } else {
      media.alt = modalTitle.textContent;
      media.addEventListener("load", () => {
        if (media.isConnected) modal.classList.toggle("portrait-preview", media.naturalHeight > media.naturalWidth);
      }, { once: true });
    }
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

function clearModalMedia() {
  modalMedia.replaceChildren();
  modalArt.classList.remove("has-media");
  modal.classList.remove("portrait-preview", "profile-info-preview", "profile-photo-preview");
  delete modal.dataset.profilePreview;
}

function createModalItems(cards) {
  return cards.flatMap((card) => {
    const sources = (card.dataset.mediaSrcs || card.dataset.mediaSrc || "").split("|").filter(Boolean);
    const mediaTypes = (card.dataset.mediaTypes || card.dataset.mediaType || "image").split("|");
    return (sources.length ? sources : [""]).map((source, index) => ({
      card,
      source,
      mediaType: mediaTypes[index] || mediaTypes[mediaTypes.length - 1] || "image",
      sourceIndex: index
    }));
  });
}

function openProfilePreview(type) {
  const text = (key) => translations[key][language];
  modalCards = [];
  modalItems = [];
  clearModalMedia();
  modal.dataset.profilePreview = type;
  modalArt.className = "modal-art violet";
  modalMedia.replaceChildren();

  if (type === "portrait") {
    modal.classList.add("profile-photo-preview");
    const image = document.createElement("img");
    image.className = "modal-media-item";
    image.alt = language === "zh" ? "陈冠宇个人照片" : "Portrait of Chin Guan Yue";
    image.src = "./assets/self-intro/我的头像照片.jpg";
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
      text("bio.phone") + "：13121425198",
      text("bio.email") + "：guanyue0413@gmail.com",
      "",
      text("bio.intro")
    ].join("\n");
    if (modalPreviewLabel) modalPreviewLabel.textContent = language === "zh" ? "完整资料" : "FULL PROFILE";
  }

  if (!modal.open) modal.showModal();
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

function setupNavigationScroll() {
  const nav = document.querySelector("#primaryNav");
  if (!nav) return;
  nav.addEventListener("wheel", (event) => {
    if (nav.scrollWidth <= nav.clientWidth) return;
    const distance = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
    if (!distance) return;
    nav.scrollLeft += distance;
    event.preventDefault();
  }, { passive: false });
}

function setNext(name) {
  const next = order[(order.indexOf(name) + 1) % order.length];
  nextButton.dataset.next = next;
  nextText.textContent = next === "home" ? (language === "zh" ? "点击此处回到首页" : "Return to home") : (language === "zh" ? "点击此处前往" : "Go to ") + labels[language][next];
}

function updateGalleryTitle(gallery) {
  if (!gallery.dataset.titleTarget) return;
  const title = document.querySelector("#" + gallery.dataset.titleTarget);
  const cards = Array.from(gallery.querySelectorAll(".card"));
  const activeIndex = Number(gallery.dataset.activeCardIndex || 0);
  const card = cards[activeIndex] || cards[0];
  if (title && card) title.textContent = cardValue(card, "title");
}

function closeMenu() {
  navControl.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function openMenu() {
  navControl.classList.add("menu-open");
  menuToggle.setAttribute("aria-expanded", "true");
}

function replayLines() {
  movingLines.classList.remove("reveal-lines");
  void movingLines.offsetWidth;
  movingLines.classList.add("reveal-lines");
}

function goTo(name, direction, withRipple = false) {
  if (!labels.zh[name] || name === current || navigating) return;
  navigating = true;
  if (withRipple) triggerNavigationRipple();
  const selected = screens.find((screen) => screen.dataset.screen === name);
  screens.forEach((screen) => {
    const active = screen === selected;
    screen.classList.toggle("active", active);
    screen.classList.toggle("enter-up", active && direction === "up");
    screen.setAttribute("aria-hidden", String(!active));
  });
  navButtons.forEach((button) => button.classList.toggle("current", button.dataset.target === name));
  current = name;
  setNext(name);
  document.querySelectorAll("[data-project-target]").forEach((dot) => {
    dot.classList.toggle("active", dot.dataset.projectTarget === name);
  });
  replayLines();
  document.title = "Funnyboy Portfolio";
  window.setTimeout(() => { navigating = false; }, 930);
}

function updateLanguage() {
  document.body.dataset.language = language;
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const word = translations[element.dataset.i18n];
    if (word) element.textContent = word[language];
  });
  splitContactText();
  const currentCard = document.querySelector(".card.expanded");
  if (currentCard) {
    const gallery = currentCard.closest(".gallery");
    document.querySelector("#" + gallery.dataset.descriptionTarget).textContent = cardValue(currentCard, "description");
  }
  document.querySelectorAll(".gallery[data-title-target]").forEach(updateGalleryTitle);
  if (modal.open) {
    if (modal.dataset.profilePreview) openProfilePreview(modal.dataset.profilePreview);
    else showModalCard(modalCardIndex);
  }
  languageToggle.textContent = language === "zh" ? "EN" : "中文";
  languageToggle.setAttribute("aria-label", language === "zh" ? "Switch to English" : "切换为中文");
  setNext(current);
  document.title = "Funnyboy Portfolio";
}

navButtons.forEach((button) => button.addEventListener("click", () => {
  const target = button.dataset.target;
  const direction = order.indexOf(target) < order.indexOf(current) ? "up" : "down";
  goTo(target, direction, true);
  closeMenu();
}));

navControl.addEventListener("pointerenter", (event) => { if (event.pointerType === "mouse") openMenu(); });
navControl.addEventListener("pointerleave", () => closeMenu());
navControl.addEventListener("focusin", openMenu);
navControl.addEventListener("focusout", () => {
  window.setTimeout(() => { if (!navControl.contains(document.activeElement)) closeMenu(); }, 0);
});
menuToggle.addEventListener("click", () => {
  if (window.matchMedia("(hover: hover)").matches) {
    openMenu();
    return;
  }
  if (navControl.classList.contains("menu-open")) closeMenu();
  else openMenu();
});

nextButton.addEventListener("click", () => goTo(nextButton.dataset.next, "down", true));
languageToggle.addEventListener("click", () => {
  language = language === "zh" ? "en" : "zh";
  updateLanguage();
});

document.querySelectorAll(".gallery").forEach((gallery) => {
  const description = document.querySelector("#" + gallery.dataset.descriptionTarget);
  const title = gallery.dataset.titleTarget ? document.querySelector("#" + gallery.dataset.titleTarget) : null;
  const cards = Array.from(gallery.querySelectorAll(".card"));
  const closeCard = () => {
    gallery.classList.remove("expanded");
    cards.forEach((card) => card.classList.remove("expanded"));
  };
  cards.forEach((card, index) => {
    const expand = () => {
      ensureCardArtwork(card);
      gallery.classList.add("expanded");
      cards.forEach((item) => item.classList.toggle("expanded", item === card));
      description.textContent = cardValue(card, "description");
      gallery.dataset.activeCardIndex = String(index);
      if (title) title.textContent = cardValue(card, "title");
    };
    card.addEventListener("pointerenter", expand);
    card.addEventListener("focus", expand);
    card.addEventListener("click", () => {
      ensureCardArtwork(card);
      if (card.dataset.route) {
        goTo(card.dataset.route, "down", true);
        return;
      }
      modalCards = cards.filter((item) => !item.dataset.route);
      modalItems = createModalItems(modalCards);
      modalCardIndex = modalItems.findIndex((item) => item.card === card);
      showModalCard(modalCardIndex);
      if (!modal.open) modal.showModal();
    });
  });
  gallery.addEventListener("pointerleave", closeCard);
});

document.querySelectorAll("[data-project-target]").forEach((dot) => {
  dot.addEventListener("click", () => {
    const target = dot.dataset.projectTarget;
    goTo(target, target === "niko" ? "up" : "down", true);
  });
});

window.addEventListener("wheel", (event) => {
  if (modal.open || Math.abs(event.deltaY) < 8) return;
  event.preventDefault();
  if (navigating) return;
  const index = order.indexOf(current);
  const direction = event.deltaY > 0 ? "down" : "up";
  const target = direction === "down" ? order[(index + 1) % order.length] : order[(index - 1 + order.length) % order.length];
  goTo(target, direction);
}, { passive: false });

document.querySelector("#closeModal").addEventListener("click", () => { clearModalMedia(); modal.close(); });
modal.addEventListener("click", (event) => { if (event.target === modal) { clearModalMedia(); modal.close(); } });
modal.addEventListener("cancel", clearModalMedia);
modalPrev.addEventListener("click", () => showModalCard(modalCardIndex - 1));
modalNext.addEventListener("click", () => showModalCard(modalCardIndex + 1));
document.addEventListener("keydown", (event) => {
  if (!modal.open) return;
  if (event.key === "ArrowLeft") showModalCard(modalCardIndex - 1);
  if (event.key === "ArrowRight") showModalCard(modalCardIndex + 1);
});
prepareDeferredArtwork();
setupDepthInteractions();
setupPanelGlow();
startMetaBalls();
startClickRipples();
startParticleFog();
startCursorRibbons();
startHomeTitleDepth();
setupProfilePreviews();
setupNavigationScroll();
setNext(current);
updateLanguage();

const screens = Array.from(document.querySelectorAll("[data-screen]"));
const nav = Array.from(document.querySelectorAll("[data-target]"));
const toggle = document.querySelector("#menuToggle");
const primaryNav = document.querySelector("#primaryNav");
const nextButton = document.querySelector("#nextButton");
const nextText = document.querySelector("#nextText");
const modal = document.querySelector("#workModal");
const modalTitle = document.querySelector("#modalTitle");
const modalDescription = document.querySelector("#modalDescription");
const modalIndex = document.querySelector("#modalIndex");
const modalArt = document.querySelector("#modalArt");

const order = ["home", "profile", "collab", "projects", "ip", "works"];
const names = { home: "首页", profile: "个人简介", collab: "大三联创", projects: "参与项目", ip: "原创IP", works: "个人作品" };
let current = "home";

function setNext(name) {
  const next = order[(order.indexOf(name) + 1) % order.length];
  nextButton.dataset.next = next;
  nextText.textContent = next === "home" ? "点击此处回到首页" : "点击此处前往" + names[next];
}

function goTo(name) {
  if (!names[name] || name === current) return;
  screens.forEach((screen) => {
    const active = screen.dataset.screen === name;
    screen.classList.toggle("active", active);
    screen.setAttribute("aria-hidden", String(!active));
  });
  nav.forEach((button) => button.classList.toggle("current", button.dataset.target === name));
  current = name;
  setNext(name);
  document.title = names[name] + "｜陈冠宇 Portfolio";
}

nav.forEach((button) => button.addEventListener("click", () => goTo(button.dataset.target)));
nextButton.addEventListener("click", () => goTo(nextButton.dataset.next));
toggle.addEventListener("click", () => {
  const closed = primaryNav.classList.toggle("closed");
  toggle.setAttribute("aria-expanded", String(!closed));
});

document.querySelectorAll(".gallery").forEach((gallery) => {
  const description = document.querySelector("#" + gallery.dataset.descriptionTarget);
  const cards = Array.from(gallery.querySelectorAll(".card"));
  const closeCard = () => {
    gallery.classList.remove("expanded");
    cards.forEach((card) => card.classList.remove("expanded"));
  };
  cards.forEach((card, index) => {
    const expand = () => {
      gallery.classList.add("expanded");
      cards.forEach((item) => item.classList.toggle("expanded", item === card));
      description.textContent = card.dataset.description;
    };
    card.addEventListener("pointerenter", expand);
    card.addEventListener("focus", expand);
    card.addEventListener("click", () => {
      modalTitle.textContent = card.dataset.title;
      modalDescription.textContent = card.dataset.description;
      modalIndex.textContent = "WORK / " + String(index + 1).padStart(2, "0");
      modalArt.className = "modal-art " + card.dataset.tone;
      modal.showModal();
    });
  });
  gallery.addEventListener("pointerleave", closeCard);
});

document.querySelector("#closeModal").addEventListener("click", () => modal.close());
modal.addEventListener("click", (event) => { if (event.target === modal) modal.close(); });
setNext(current);

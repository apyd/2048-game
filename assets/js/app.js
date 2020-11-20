import Controller from "./controller.js";
import View from "./view.js";
import Model from "./model.js";

!localStorage.getItem('bestScore') ? localStorage.getItem('bestScore', 0) : null;

const startBtn = document.querySelector(".btn--start");
const closeBtn = document.querySelector(".btn--close");
const rulesBtn = document.querySelector(".btn--rules");
const overlay = document.querySelector(".overlay");
const bestScoreSpan = document.querySelectorAll('.scoreboard__value')[0];
const currentScoreSpan = document.querySelectorAll('.scoreboard__value')[1];

export const view = new View(overlay, bestScoreSpan, currentScoreSpan);
export const model = new Model();
export const controller = new Controller(startBtn, closeBtn, rulesBtn);
startBtn.addEventListener("click", () => controller.startGame());
rulesBtn.addEventListener("click", () => view.togglePopup());
closeBtn.addEventListener("click", () => view.togglePopup());
overlay.addEventListener("click", (e) => e.target === overlay ? view.togglePopup() : null);
window.addEventListener("keyup", (e) => controller.onKeyPress(e.key));
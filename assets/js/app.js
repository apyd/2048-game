import Controller from "./controller.js";
import View from "./view.js";
import Model from "./model.js";

const startBtn = document.querySelectorAll(".btn--primary")[0];
const closeBtn = document.querySelector(".btn--close");
const rulesBtn = document.querySelectorAll(".btn--primary")[1];
const overlay = document.querySelector(".overlay");
const radioBtns = document.querySelectorAll(".radio");

export const view = new View();
export const model = new Model();
export const controller = new Controller();

radioBtns.forEach(radioBtn => radioBtn.addEventListener('click', () => {
    startBtn.disabled = false;
    controller.gameType = radioBtn.value;
}))

startBtn.addEventListener("click", () => controller.startGame());
rulesBtn.addEventListener("click", () => view.togglePopup());
closeBtn.addEventListener("click", () => view.togglePopup());
overlay.addEventListener("click", (e) => e.target === overlay ? view.togglePopup() : null);
window.addEventListener("keyup", (e) => controller.onKeyPress(e.key));
window.addEventListener('DOMContentLoaded', () => view.updateScore());
import Controller from "./controller.js";
import View from "./view.js";
import Model from "./model.js";

const startBtns = document.querySelectorAll(".btn--start");
const rulesBtns = document.querySelectorAll(".btn--rules");
const closeBtn = document.querySelector(".btn--close");
const overlay = document.querySelector(".overlay");
const radioBtns = document.querySelectorAll(".radio");
const board = document.querySelector(".board");
const leftArrow = document.querySelector(".btn--arrow");

export const view = new View();
export const model = new Model();
export const controller = new Controller();

radioBtns.forEach(radioBtn => radioBtn.addEventListener('click', () => {
    startBtns[0].disabled = false;
    controller.gameType = radioBtn.value;
}))

startBtns.forEach(startBtn => startBtn.addEventListener("click", () => controller.startGame()));
rulesBtns.forEach(rulesBtn => rulesBtn.addEventListener("click", () => view.togglePopup()));
closeBtn.addEventListener("click", () => view.togglePopup());
overlay.addEventListener("click", (e) => e.target === overlay ? view.togglePopup() : null);
window.addEventListener("keyup", (e) => controller.onKeyPress(e.key));
window.addEventListener('DOMContentLoaded', () => view.updateScore());
board.addEventListener('touchstart', (e) => controller.onTouch(e.type, e.changedTouches[0].clientX, e.changedTouches[0].clientY));
board.addEventListener('touchend', (e) => controller.onTouch(e.type, e.changedTouches[0].clientX, e.changedTouches[0].clientY));
leftArrow.addEventListener('click', () => controller.stopGame());
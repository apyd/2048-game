import Controller from "./controller.js";
import View from "./view.js";
import Model from "./model.js";

const startBtn = document.getElementById("start-game");
const restartBtn = document.getElementById('restart-game');
const closeBtn = document.getElementById("close-popup");
const arrowBtn = document.getElementById("open-entry-screen");
const overlay = document.querySelector(".overlay");
const radioBtns = document.querySelectorAll(".game-option__input");
const board = document.querySelector(".board");

export const view = new View();
export const model = new Model();
export const controller = new Controller();

radioBtns.forEach(radioBtn => radioBtn.addEventListener('click', () => {
    startBtn.disabled = false;
    controller.gameType = radioBtn.value;
}))

startBtn.addEventListener("click", () => controller.startGame());
restartBtn.addEventListener("click", () => controller.startGame());
closeBtn.addEventListener("click", () => view.togglePopup());
arrowBtn.addEventListener('click', () => controller.stopGame());
overlay.addEventListener("click", (e) => e.target === overlay ? view.togglePopup() : null);
window.addEventListener("keyup", (e) => controller.onKeyPress(e.key));
window.addEventListener('DOMContentLoaded', () => view.updateScore());
board.addEventListener('touchstart', (e) => controller.onTouch(e.type, e.changedTouches[0].clientX, e.changedTouches[0].clientY));
board.addEventListener('touchend', (e) => controller.onTouch(e.type, e.changedTouches[0].clientX, e.changedTouches[0].clientY));
window.addEventListener('resize', (e) => view.onScreenResize());
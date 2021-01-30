import { createModelInstance, createViewInstance, createControllerInstance } from './init.js';

const startBtns = document.querySelectorAll('[data-action="start-game"]');
const closeBtn = document.querySelector('[data-action="close-popup"]');
const arrowBtn = document.querySelector('[data-action="open-entry-screen"]');
const overlay = document.querySelector('.overlay');
const radioInputs = document.querySelectorAll('.game-option__input');
const board = document.querySelector('.board');

export const view = createViewInstance();
export const model = createModelInstance();
export const controller = createControllerInstance();

radioInputs.forEach((radioBtn) => radioBtn.addEventListener('click', () => {
	startBtns[0].disabled = false;
	controller.gameType = radioBtn.value;
}));
startBtns.forEach((startBtn) => startBtn.addEventListener('click', () => controller.startGame()));
closeBtn.addEventListener('click', () => view.togglePopup());
arrowBtn.addEventListener('click', () => controller.cancelGame());
overlay.addEventListener('click', () => view.togglePopup());
document.addEventListener('keydown', (e) => controller.onKeyPress(e));
window.addEventListener('resize', () => view.onScreenResize());
window.addEventListener('DOMContentLoaded', () => {
	view.updateScore();
});
['touchstart', 'touchEnd'].forEach((eventType) => board.addEventListener(eventType, (e) => controller.onTouch(e)));
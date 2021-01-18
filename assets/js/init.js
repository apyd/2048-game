import Controller from './controller.js';
import Model from './model.js';
import View from './view.js';

export function createModelInstance() { return new Model(); }
export function createViewInstance() { return new View(); }
export function createControllerInstance() { return new Controller(); }

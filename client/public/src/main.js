import { Engine } from './core/engine.js';

const engine = new Engine();
engine.init();

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

const canvas = document.querySelector("canvas");
const toolBtns = document.querySelectorAll(".tool-btn"); // Replace .tool-btn with the actual class or id of your buttons
const ctx = canvas.getContext("2d");

let isDrawing = false;
let brushWidth = 5;

window.addEventListener("load", () => {
    // setting canvas width/height... offset width/height returns viewable w/h of an element
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

const startDraw = () => {
    isDrawing = true;
    ctx.beginPath(); // creating a new path to draw
    ctx.lineWidth = brushWidth; // passing brushSize as line width
};

const drawing = (e) => {
    if (!isDrawing) return; // if isDrawing is false return from here
    ctx.lineTo(e.offsetX, e.offsetY); // creating line according to the mouse pointer
    ctx.stroke(); // drawing/filling line with colour
};

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);

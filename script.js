const canvas = document.querySelector("canvas");
const toolBtns = document.querySelectorAll(".tool-btn");
const fillColour = document.querySelector("#fill-colour");
const ctx = canvas.getContext("2d");

// Global variables with default values
let prevMouseX, prevMouseY, snapshot,
    isDrawing = false,
    selectedTool = "brush",
    brushWidth = 5;

window.addEventListener("load", () => {
    // Setting canvas width/height... offset width/height returns viewable w/h of an element
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

const drawRect = (e) => {
    // Calculate the width and height of the rectangle
    const width = e.offsetX - prevMouseX;
    const height = e.offsetY - prevMouseY;

    // If fillColour is checked, draw filled rectangle, otherwise draw stroked rectangle
    if (fillColour.checked) {
        ctx.fillRect(prevMouseX, prevMouseY, width, height);
    } else {
        ctx.strokeRect(prevMouseX, prevMouseY, width, height);
    }
};

const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX; // Passing current mouseX position as prevMouseX value
    prevMouseY = e.offsetY; // Passing current mouseY position as prevMouseY value
    ctx.beginPath(); // Creating a new path to draw
    ctx.lineWidth = brushWidth; // Passing brushSize as line width
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

const drawing = (e) => {
    if (!isDrawing) return; // If isDrawing is false, return from here
    ctx.putImageData(snapshot, 0, 0); // Adding copied canvas data onto this canvas

    if (selectedTool === "brush") {
        ctx.lineTo(e.offsetX, e.offsetY); // Creating line according to the mouse pointer
        ctx.stroke(); // Drawing/filling line with colour
    } else if (selectedTool === "rectangle") {
        drawRect(e);
    }
};

toolBtns.forEach(btn => {
    btn.addEventListener("click", () => { // Adding click event to all tool options
        // Removing active class from the previous option and adding on current clicked option
        document.querySelector(".option.active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
        console.log(btn.id);
    });
});

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);

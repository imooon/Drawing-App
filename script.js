const canvas = document.querySelector("canvas"),
ctx = canvas.getContext9("2d");

window.addEventListener("load" , () => {
    // setting canvas width/height... offset width/height returns viewable w/h of an element
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

const drawing = (e) => {
    ctx.lineTo(e.offsetX, e.offsetY); //creating line according to the mouse pointer
    ctx.stroke(); // drawing/filling line with colour
}

canvas.addEventListener("mousemove", drawing);
let myCanvas;
let colors_1 = "59c3c3-52489c-9f9ac4-ebebeb-cad2c5"
    .split("-")
    .map((a) => "#" + a);
let colors_2 = "0d3b66-faf0ca-f4d35e-ee964b-f95738"
    .split("-")
    .map((a) => "#" + a);

function setup() {
    myCanvas = createCanvas(windowWidth-200, windowHeight-200);
    // Put setup code here
    background(0);
}
let img;
let col;
// function preload() {
//     img = loadImage("texture.jpeg");
// }

function draw() {
    // background(0, 10);
    // blendMode(SOFT_LIGHT);
    colorMode(HSB);
    image(myCanvas, 0, 2);
    let span = 20;
    let bSize = 5;
    beginShape();
    for (let x = 0 - span; x < width + span; x += bSize) {
        noFill();
        let colors1 = colors_1[int(random(map(x, -span, width + span, 0, 4)))];
        let colors2 = colors_2[int(random(map(x, -span, width + span, 0, 4)))];
        // stroke(random([colors1, colors2]));

        if (mouseX < width / 2) {
            stroke(colors1)
        } else {
            stroke(colors2)
        }

        // stroke(255, map(sin(frameCount), -1, 1, 200, 255));
        strokeWeight(map(sin(frameCount), -1, 1, 1, 2));
        let y =
            sin(x / 50 + frameCount / 40) * 30 +
            sin(x / 20 + frameCount / 30) * 20 +
            (noise(x / 100, frameCount / 50) *
                noise(x / 500, frameCount / 500) *
                // noise(x / 500, frameCount / 30) *
                map(sin(x / 50), -1, 1, 0, 1) *
                height) /
            3 +
            height / 3;
        curveVertex(x, y);
    }
    endShape();
    // push();
    // blendMode(SCREEN);
    // image(img, windowWidth, windowHeight);
    // pop();
}

function mouseMoved() {
    let x = parent.mouseX;
    let y = parent.mouseY;
    // 在这里处理鼠标事件
  }
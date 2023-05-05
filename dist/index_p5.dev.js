"use strict";

var myCanvas;
var colors_1 = "59c3c3-52489c-9f9ac4-ebebeb-cad2c5".split("-").map(function (a) {
  return "#" + a;
});
var colors_2 = "0d3b66-faf0ca-f4d35e-ee964b-f95738".split("-").map(function (a) {
  return "#" + a;
});

function setup() {
  myCanvas = createCanvas(windowWidth, windowHeight); // Put setup code here

  background(0);
}

var img;
var col; // function preload() {
//     img = loadImage("texture.jpeg");
// }

function draw() {
  // background(0, 10);
  // blendMode(SOFT_LIGHT);
  colorMode(HSB);
  image(myCanvas, 0, 2);
  var span = 20;
  var bSize = 5;
  beginShape();

  for (var x = 0 - span; x < width + span; x += bSize) {
    noFill();
    var colors1 = colors_1[int(random(map(x, -span, width + span, 0, 4)))];
    var colors2 = colors_2[int(random(map(x, -span, width + span, 0, 4)))]; // stroke(random([colors1, colors2]));

    if (mouseX < width / 2) {
      stroke(colors1);
    } else {
      stroke(colors2);
    } // stroke(255, map(sin(frameCount), -1, 1, 200, 255));


    strokeWeight(map(sin(frameCount), -1, 1, 1, 2));
    var y = sin(x / 50 + frameCount / 40) * 30 + sin(x / 20 + frameCount / 30) * 20 + noise(x / 100, frameCount / 50) * noise(x / 500, frameCount / 500) * // noise(x / 500, frameCount / 30) *
    map(sin(x / 50), -1, 1, 0, 1) * height / 3 + height / 3;
    curveVertex(x, y);
  }

  endShape(); // push();
  // blendMode(SCREEN);
  // image(img, windowWidth, windowHeight);
  // pop();
}
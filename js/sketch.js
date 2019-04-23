let boidsSystem;
const nBoids = 1000;

let sepSlider, cohSlider, algSlider;

function setup() {
    createCanvas(600, 400);
    const region = new Rectangle(0, 0, width, height);
    boidsSystem = new BoidsSystem(region, nBoids);

    algSlider = createSlider(0, 10, 1, 0.1);
    cohSlider = createSlider(0, 10, 1, 0.1);
    sepSlider = createSlider(0, 100, 1, 0.1);
}

let lastTime = 0.0;

function draw() {
    background(0);

    let beh = boidsSystem.behaviors;
    beh.alignmentFactor = algSlider.value();
    beh.cohesionFactor = cohSlider.value();
    beh.separationFactor = sepSlider.value();

    const dt = (millis() - lastTime) / 1000.0;

    boidsSystem.updateBoids(dt * 2);
    boidsSystem.drawBoids();
    //boidsSystem.drawBoidsVectors();
    lastTime = millis();

    textSize(20);
    fill(255, 0, 255);
    text(floor(frameRate()), 10, 20);
}
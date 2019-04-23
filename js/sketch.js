let boidsSystem;
const nBoids = 750;

let sepSlider, cohSlider, algSlider;

function setup() {
    createCanvas(600, 400);
    const region = new Rectangle(0, 0, width, height);
    boidsSystem = new BoidsSystem(region, nBoids);

    algSlider = createSlider(0, 10, 1, 0.1);
    cohSlider = createSlider(0, 10, 1, 0.1);
    sepSlider = createSlider(0, 100, 1, 0.1);

    update();
}

let paused = false;

function update() {
    if (paused) {
        return;
    }
    const dt = (millis() - lastTime) / 1000.0;

    boidsSystem.updateBoids(dt * 4);

    lastTime = millis();

    setTimeout(update, 1);
}

let lastTime = 0.0;

function draw() {
    background(0);

    let beh = boidsSystem.flockingBehaviors;
    beh.alignmentFactor = algSlider.value();
    beh.cohesionFactor = cohSlider.value();
    beh.separationFactor = sepSlider.value();



    boidsSystem.drawBoids();
    //boidsSystem.drawBoidsVectors();

    textSize(20);
    fill(255, 0, 255);
    text(floor(frameRate()), 10, 20);
}
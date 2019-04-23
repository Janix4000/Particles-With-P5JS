let boidsSystem;
const nBoids = 1000;

function setup() {
    createCanvas(600, 400);
    const region = new Rectangle(0, 0, width, height);
    boidsSystem = new BoidsSystem(region, nBoids);
}

let lastTime = 0.0;

function draw() {
    background(0);

    const dt = (millis() - lastTime) / 1000.0;

    boidsSystem.updateBoids(dt * 2);
    boidsSystem.drawBoids();
    //boidsSystem.drawBoidsVectors();
    lastTime = millis();

    textSize(20);
    fill(255, 0, 255);
    text(floor(frameRate()), 10, 20);
}
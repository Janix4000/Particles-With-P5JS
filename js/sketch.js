let boidsSystem;
const nBoids = 200;

function setup() {
    createCanvas(600, 400);
    const region = new Rectangle(0, 0, width, height);
    boidsSystem = new BoidsSystem(region, nBoids);
}

let lastTime = 0.0;

function draw() {
    background(0);

    const dt = (millis() - lastTime) / 1000.0;

    boidsSystem.updateBoids(dt * 3);
    boidsSystem.drawBoids();
    boidsSystem.drawBoidsVectors();
    lastTime = millis();
}
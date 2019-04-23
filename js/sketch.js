let boids = [];

let qTree;

function resetQTree() {
    qTree.clear();
    for (const b of boids) {
        const point = new Point(b.pos.x, b.pos.y, b);
    }
}

function drawBoids() {
    for (const boid of boids) {
        boid.render();
    }
}

function updateBoids(dt) {
    for (const boid of boids) {
        boid.update(dt);
    }
    resetQTree();
}

function setup() {
    createCanvas(600, 400);
    for (let i = 0; i < 100; i++) {
        boids.push(new Boid(createVector(width / 2, height / 2)));
    }
    const region = new Rectangle(0, 0, width, height);
    qTree = new QuadTree(region, 4, 16);
}

let lastTime = 0.0;

function draw() {
    background(0);

    const dt = (millis() - lastTime) / 1000.0;
    updateBoids(dt);
    drawBoids();
    lastTime = millis();
}
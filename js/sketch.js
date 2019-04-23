let boids = [];

let qTree;

function setup() {
    createCanvas(600, 400);
    for (let i = 0; i < 100; i++) {
        boids.push(new Boid(createVector(width / 2, height / 2)));
    }

    qTree = new QuadTree(region, 4, 16);
}

function draw() {
    background(0);

}
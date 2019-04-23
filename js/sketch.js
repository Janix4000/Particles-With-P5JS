let boids = [];

let qTree;
let points = [];
let range;

function setup() {
    createCanvas(600, 400);
    for (let i = 0; i < 100; i++) {
        boids.push(new Boid(createVector(width / 2, height / 2)));
    }

    const region = new Rectangle(0, 0, width, height);
    qTree = new QuadTree(region, 4, 16);
    console.log(qTree);

    //range = new Rectangle(width / 2, height / 2, 100, 100);
    range = new Circle(100, 100, 100);
}

function draw() {
    background(0);
    if (mouseIsPressed) {
        const p = new Point(mouseX + random(-10, 10), mouseY + random(-10, 10));
        points.push(p);
    }
    qTree.clear();
    range.x = mouseX; // - range.r;
    range.y = mouseY; // - range.r;
    for (const p of points) {
        p.x += random(-5, 5);
        p.y += random(-5, 5);
        qTree.insert(p);
    }
    for (const p of points) {
        noStroke();
        fill(255);
        ellipse(p.x, p.y, 4, 4);
    }
    renderQuadTree(qTree);
    stroke(0, 255, 0);
    noFill();
    strokeWeight(2)
    ellipse(range.x, range.y, range.r * 2);

    const highlited = qTree.queery(range);
    for (const p of highlited) {
        noStroke();
        fill(255, 0, 0);
        ellipse(p.x, p.y, 4, 4);
    }
}
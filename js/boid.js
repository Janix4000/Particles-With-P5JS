class Boid {
    constructor(pos) {
        this.pos = pos.copy();
        this.vel = createVector(random(-10, 10), random(-10, 10));
        this.acc = createVector();
    }

    update(dt) {
        this.vel.add(p5.Vector.mult(this.acc, dt));
        this.pos.add(p5.Vector.mult(this.vel, dt));
        this.acc.mult(0);
    }
    render() {
        noStroke();
        fill(255);
        ellipse(this.pos.x, this.pos.y, 5);
    }
}
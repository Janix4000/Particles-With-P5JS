class Boid {
    constructor(pos) {
        this.pos = pos.copy();
        const startingSpeed = 20;
        this.vel = p5.Vector.mult(p5.Vector.random2D(), startingSpeed);
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

    applyForce(force) {
        this.acc.add(force);
    }
}
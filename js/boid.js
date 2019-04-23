class Boid {
    constructor(pos) {
        this.pos = pos.copy();
        const startingSpeed = 25;
        this.vel = p5.Vector.mult(p5.Vector.random2D(), startingSpeed);
        this.acc = createVector();
        this.oldAcc = createVector();

        this.constSpeed = 25.0;
    }

    update(dt) {
        this.vel.add(p5.Vector.mult(this.acc, dt));
        this.vel.setMag(this.constSpeed);
        this.pos.add(p5.Vector.mult(this.vel, dt));
        this.oldAcc = this.acc.copy();
        this.acc.mult(0);
    }
    render() {
        noStroke();
        fill(255);
        ellipse(this.pos.x, this.pos.y, 5);
    }

    renderVectors() {
        strokeWeight(1);
        const x = this.pos.x;
        const y = this.pos.y;

        stroke(0, 0, 255);
        line(x, y, x + this.vel.x, y + this.vel.y);
        stroke(255, 0, 0);
        line(x, y, x + this.oldAcc.x, y + this.oldAcc.y);
    }

    applyForce(force) {
        this.acc.add(force);
    }
}
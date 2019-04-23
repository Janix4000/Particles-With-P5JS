class EscapePointBehaviors {
    constructor() {
        this.mousPos = createVector();
        this.escapeFactor = 2000;
    }

    applyBehaviors(boids, point) {
        for (const boid of boids) {
            let force = createVector();

            force.add(this._getEscape(boid, point));

            boid.applyForce(force);
        }
    }

    _getEscape(boid, point) {
        const pos = point;
        let distSq = sq(pos.x - boid.pos.x) + sq(pos.y - boid.pos.y);
        let dist = p5.Vector.sub(boid.pos, pos);
        dist.div(distSq);
        let desire = dist.copy(); //p5.Vector.sub(dist, boid.vel);
        desire.mult(this.escapeFactor);
        return desire;
    }
}
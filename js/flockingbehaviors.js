class FlockingBehaviors {

    constructor() {
        this.perceptionRadius = 20;
        this.alignmentFactor = 3;
        this.cohesionFactor = 0.05;
        this.separationFactor = 10.0;
    }

    applyBehaviors(boids, qTree) {
        for (const boid of boids) {
            const visibleBoids = this._getVisibleBoids(boid, qTree);
            let force = createVector();

            force.add(this._getAlignment(boid, visibleBoids));
            force.add(this._getCohesion(boid, visibleBoids));
            force.add(this._getSeparation(boid, visibleBoids));

            boid.applyForce(force);
        }
    }

    _getVisibleBoids(boid, qTree) {
        const perceptionCircle = new Circle(boid.pos.x, boid.pos.y, this.perceptionRadius);
        const points = qTree.queery(perceptionCircle);
        let visibleBoids = [];
        for (const p of points) {
            const vb = p.userData;
            if (boid === vb) {
                continue;
            }
            visibleBoids.push(vb);
        }

        return visibleBoids;
    }

    _getAlignment(boid, visibleBoids) {
        const avrgVel = this._getAverageVelocityOr(visibleBoids, boid.vel);
        let desire = p5.Vector.sub(avrgVel, boid.vel);
        desire.mult(this.alignmentFactor);
        return desire;
    }
    _getAverageVelocityOr(boids, vel) {
        if (boids.length == 0) {
            return vel
        }
        let sumVel = boids.reduce((acc, val) => acc.add(val.vel), createVector(0, 0));
        return p5.Vector.div(sumVel, boids.length);
    }

    _getCohesion(boid, visibleBoids) {
        const avrgPos = this._getAveragePositionOr(visibleBoids, boid.pos);
        let desire = p5.Vector.sub(avrgPos, boid.pos);
        desire.mult(this.cohesionFactor);
        return desire;
    }

    _getAveragePositionOr(boids, pos) {
        if (boids.length == 0) {
            return pos
        }
        let sumPos = boids.reduce((acc, val) => acc.add(val.pos), createVector(0, 0));
        return p5.Vector.div(sumPos, boids.length);
    }

    _getSeparation(boid, visibleBoids) {
        const escape = this._getEscapeFromBoids(visibleBoids, boid);
        let desire = escape.copy();
        //p5.Vector.sub(escape, boid.vel);
        desire.limit(10);
        desire.mult(this.separationFactor);
        return desire;
    }

    _getEscapeFromBoids(visibleBoids, boid) {
        let escape = createVector();
        for (const b of visibleBoids) {
            let distSq = sq(b.pos.x - boid.pos.x) + sq(b.pos.y - boid.pos.y);
            let dist = p5.Vector.sub(boid.pos, b.pos);
            dist.div(distSq);
            escape.add(dist);
        }

        return escape;
    }
}
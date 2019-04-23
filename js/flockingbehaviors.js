class FlockingBehaviors {

    constructor() {
        this.perceptionRadius = 30;
        this.alignmentFactor = 1.0;
    }

    applyBehaviors(boids, qTree) {
        for (const boid of boids) {
            const visibleBoids = this._getVisibleBoids(boid, qTree);
            let force = createVector();
            force.add(this._getAlignment(boid, visibleBoids));


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
}
class BoidsSystem {
    constructor(region, nBoids) {
        this.boids = [];
        for (let i = 0; i < nBoids; ++i) {
            const pos = createVector(random(region.w), random(region.h));
            this.boids.push(new Boid(pos));
        }
        this.qTree = new QuadTree(region, 4, 16);
        this.region = region;

        this.flockingBehaviors = new FlockingBehaviors();
        this.mouseBehavior = new EscapePointBehaviors();
        this.textBehaviors = new TextBehaviors();

        this.textBehaviors.setText("Konstytucja");
        this.hasConstSpeed = true;
    }

    _resetQTree() {
        this.qTree.clear();
        for (const b of this.boids) {
            const point = new Point(b.pos.x, b.pos.y, b);
            this.qTree.insert(point);
        }
    }

    drawBoids() {
        for (const boid of this.boids) {
            boid.render();
        }
        //renderQuadTree(this.qTree);
    }

    drawBoidsVectors() {
        for (const boid of this.boids) {
            boid.renderVectors();
        }
    }

    _applyBehaviors() {
        if (keyIsPressed) {
            this.textBehaviors.applyBehaviors(this.boids);
            this.hasConstSpeed = false;
        } else {
            this.flockingBehaviors.applyBehaviors(this.boids, this.qTree);
            this.hasConstSpeed = true;
        }
        if (mouseIsPressed) {
            let mousePos = createVector(mouseX, mouseY);
            this.mouseBehavior.applyBehaviors(this.boids, mousePos);
        }
    }

    updateBoids(dt) {
        this._applyBehaviors();
        for (const boid of this.boids) {
            let constSpeed = this.hasConstSpeed ? 25 : undefined;
            boid.update(dt, constSpeed);
            this._edge(boid);
        }
        this._resetQTree();
    }

    _edge(boid) {
        const l = this.region.x;
        const t = this.region.y;
        const r = l + this.region.w;
        const b = t + this.region.h;

        if (boid.pos.x > r) {
            boid.pos.x -= this.region.w;
        }
        while (boid.pos.x < l) {
            boid.pos.x += this.region.w;
        }
        while (boid.pos.y > b) {
            boid.pos.y -= this.region.h;
        }
        while (boid.pos.y < t) {
            boid.pos.y += this.region.h;
        }

    }
}
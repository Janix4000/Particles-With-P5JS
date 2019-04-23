class BoidsSystem {
    constructor(region, nBoids) {
        this.boids = [];
        for (let i = 0; i < nBoids; ++i) {
            const pos = createVector(random(region.w), random(region.h));
            this.boids.push(new Boid(pos));
        }
        this.qTree = new QuadTree(region, 4, 16);
        this.region = region;
    }

    _resetQTree() {
        this.qTree.clear();
        for (const b of this.boids) {
            const point = new Point(b.pos.x, b.pos.y, b);
        }
    }

    drawBoids() {
        for (const boid of this.boids) {
            boid.render();
        }
    }

    updateBoids(dt) {
        for (const boid of this.boids) {
            boid.update(dt);
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
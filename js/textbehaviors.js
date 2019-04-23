let font;

function preload() {
    font = loadFont("resources/fonts/Lato/Lato-Regular.ttf")
}


class TextBehaviors {
    constructor() {
        this.text = "";
        this.pos = createVector();
        this.font = font;
        this.fontSize = 20;
        this.points = [];
        this.arriveFactor = 5;
    }

    setText(text, pos, fontSize) {
        this.text = text;
        if (!fontSize) {
            let size = createVector(width / 2, height / 2);
            fontSize = min(size.x, size.y) / 2;
        }
        if (!pos) {
            let bounds = font.textBounds(text, 0, 0, fontSize);
            pos = createVector((width - bounds.w) / 2, (height - bounds.h) / 2);
        }
        this.pos = pos;
        this.fontSize = fontSize;

        this._createPoints();
    }

    _createPoints() {
        console.log(this.font, this.pos, this.fontSize);

        this.points = this.font.textToPoints(this.text, this.pos.x, this.pos.y, this.fontSize, {
            sampleFactor: 0.25,
            simplifyThreshold: 0
        });
    }

    applyBehaviors(boids) {
        const nPoints = this.points.length;
        for (let i = 0; i < boids.length; ++i) {
            const boid = boids[i];
            const point = this.points[i % nPoints];
            let force = this._getArrive(boid, point);

            boid.applyForce(force);
        }
    }

    _getArrive(boid, point) {
        const target = createVector(point.x, point.y);
        let dist = p5.Vector.sub(target, boid.pos);
        let desire = p5.Vector.sub(dist, boid.vel);
        desire.mult(this.arriveFactor);
        return desire;
    }
}
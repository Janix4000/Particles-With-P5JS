const fontName = "Lato";
let font;

function preload() {
    font = loadFont("resources/fonts/Lato/Lato-Regular.ttf");
}
let particles = [];
let textPoints;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function makePoints(text) {
    let size = createVector(width / 2, height / 2);
    const fontSize = min(size.x, size.y) / 2;
    let bounds = font.textBounds(text, 0, 0, fontSize);
    let pos = createVector((width - bounds.w) / 2, (height - bounds.h) / 2);

    return
}

function makeParticles(points) {
    _createParticles(points);
    _setParticlesTargets(points);
    console.log(particles.length);
}

function _createParticles(points) {
    const nParticles = particles.length;
    const nPoints = points.length;
    if (nPoints > nParticles) {
        let i = nParticles - 1;
        if (nParticles == 0) {
            particles.push(new Particle(createVector(0, 0)));
        }
        while (particles.length < nPoints) {
            const parentPos = particles[i % nParticles].pos.copy();
            particles.push(new Particle(parentPos));
            --i;
            if (i < 0) {
                i = nParticles - 1;
            }
        }
    } else if (nParticles > nPoints) {
        while (particles.length > nPoints) {
            let iToDel = floor(random(particles.length));
            particles.splice(iToDel, 1);
        }
    }
}

function _setParticlesTargets(points) {
    //shuffleArray(particles);
    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const particle = particles[i];
        const target = createVector(point.x, point.y);
        particle.target = target;
    }
}

function randomiseParticlesPoses() {
    for (const particle of particles) {
        particle.pos = createVector(random(width), random(height));
    }
}
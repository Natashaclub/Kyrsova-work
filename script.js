const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 300;
const heartScale = 8;

function createHeartPoints() {
    const points = [];
    for (let t = 0; t < Math.PI * 2; t += 0.1) {
        const x = 27 * Math.pow(Math.sin(t), 3);
        const y = 21 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        points.push({ x: x * heartScale, y: -y * heartScale });
    }
    return points;
}

const heartPoints = createHeartPoints();

class Particle {
    constructor(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.speed = Math.random() * 2 + 1;
        this.size = Math.random() * 8 + 1;
        this.color = 'rgba(255, 0, 0, ' + Math.random() + ')';
    }

    update() {
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const moveX = (dx / distance) * this.speed;
        const moveY = (dy / distance) * this.speed;
        this.x += moveX;
        this.y += moveY;

        if (distance < 1) {
            this.x = this.targetX;
            this.y = this.targetY;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 5, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        const targetPoint = heartPoints[i % heartPoints.length];
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y, canvas.width / 2 + targetPoint.x, canvas.height / 2 + targetPoint.y));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

initParticles();
animate();
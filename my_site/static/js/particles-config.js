const cpCanvas = document.getElementById('cursor-canvas');
const cpCtx = cpCanvas.getContext('2d');
cpCanvas.width = window.innerWidth;
cpCanvas.height = window.innerHeight;

const trail = [];
function spawnParticle(x, y) {
  trail.push({ x, y, size: Math.random() * 4 + 1.5, alpha: 0.8, vx: (Math.random() - 0.5) * 1.4, vy: (Math.random() - 0.5) * 1.4 });
}

function drawTrail() {
  cpCtx.clearRect(0, 0, cpCanvas.width, cpCanvas.height);
  trail.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.alpha *= 0.95;
    cpCtx.fillStyle = `rgba(0, 229, 255, ${particle.alpha})`;
    cpCtx.beginPath();
    cpCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    cpCtx.fill();
    if (particle.alpha <= 0.03) trail.splice(index, 1);
  });
}

function animateTrail() {
  drawTrail();
  requestAnimationFrame(animateTrail);
}

window.addEventListener('mousemove', (event) => {
  for (let i = 0; i < 3; i++) {
    spawnParticle(event.clientX + Math.random() * 8 - 4, event.clientY + Math.random() * 8 - 4);
  }
});

window.addEventListener('resize', () => {
  cpCanvas.width = window.innerWidth;
  cpCanvas.height = window.innerHeight;
});

animateTrail();

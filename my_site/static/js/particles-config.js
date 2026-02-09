const cpCanvas = document.getElementById("cursor-canvas");
const cpCtx = cpCanvas.getContext("2d");
cpCanvas.width = window.innerWidth;
cpCanvas.height = window.innerHeight;

let particles = [];
function Particle(x, y) {
    this.x = x; this.y = y;
    this.size = Math.random()*4+2;
    this.life = 30;
    this.dx = (Math.random()-0.5)*3;
    this.dy = (Math.random()-0.5)*3;
}
Particle.prototype.update = function() {
    this.x += this.dx; this.y += this.dy; this.life--;
}
Particle.prototype.draw = function() {
    cpCtx.fillStyle = "rgba(0,255,255,0.7)";
    cpCtx.beginPath();
    cpCtx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    cpCtx.fill();
}

function handleParticles() {
    cpCtx.clearRect(0,0,cpCanvas.width,cpCanvas.height);
    for(let i=0;i<particles.length;i++){
        particles[i].update();
        particles[i].draw();
        if(particles[i].life <= 0){ particles.splice(i,1); i--; }
    }
}
setInterval(handleParticles, 30);

window.addEventListener("mousemove", function(e){
    for(let i=0;i<3;i++){
        particles.push(new Particle(e.clientX, e.clientY));
    }
});

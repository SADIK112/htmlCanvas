var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}

var colors = [

    '#115D8C',
    '#C7D9D9',
    '#DC4C6D',
    '#C46698',
];

window.addEventListener('mousemove', function(event) {

    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);

});

window.addEventListener('resize', function() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();

});

function distanceFromCenter(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.06;
    this.distanceFromCenter = distanceFromCenter(50, 120);
    this.lastMouse = {
        x: x,
        y: y
    };

    this.draw = function(lastPoint) {
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.fill();
    };

    // function for particle movement.

    this.update = function() {

        const lastPoint = {
            x: this.x,
            y: this.y
        };

        this.radians += this.velocity;

        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

        this.x = (this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter);
        this.y = (this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter);

        this.draw(lastPoint);

        // console.log(Math.cos(this.radians) * 100)
        // console.log(Math.sin(this.radians) * 100)
    }

}

var particles;

function init() {

    particles = [];

    for (var i = 0; i < 50; i++) {
        const radius = (Math.random() * 2) + 1;
        particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, randomColor(colors)));

    }
}

function animate() {

    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(255, 255, 255, 0.05)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
    });
}
init();
animate();
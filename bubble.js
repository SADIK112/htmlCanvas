var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

//c.fillStyle = '#6f95db';
//c.fillRect(100, 200, 100, 100);
//c.fillStyle = 'rgba(255, 0, 0, 0.5)';
//c.fillRect(500, 200, 100, 100);
//c.fillStyle = 'rgba(0, 255, 0, 0.5)';
//c.fillRect(300, 400, 100, 100);
//c.fillStyle = '#ea926b';
//c.fillRect(300, 0, 100, 100);
//console.log(canvas);

// Line
//c.beginPath();
//c.moveTo(200, 250);
//c.lineTo(350, 100);
//c.lineTo(500, 250);
//c.lineTo(350, 400);
//c.lineTo(200, 250);
//c.strokeStyle = "#197788";
//c.stroke();

// Arc/Circle
//for(var i = 0; i < 200; i++){
//    
//    var x = Math.random() * window.innerWidth; 
//    var y = Math.random() * window.innerHeight;
//    function get_random_color()
//        {
//            return '#' + Math.random().toString(16).substring(4);
//        }
//    
//    c.beginPath();
//    c.arc(x, y, 30, 0, Math.PI * 2, false);
//    c.strokeStyle = 'red';
//    c.stroke();
//    
//    c.beginPath();
//    c.arc(x, y, 50, 0, Math.PI * 2, false);
//    c.strokeStyle = 'blue';
//    c.stroke();
//}

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40; 
//var minRadius = 5;

var colorArray = [
    
    '#115D8C',
    '#C7D9D9',
    '#DC4C6D',
    '#F2B0C4',
    '#F3703D',
];

window.addEventListener('mousemove', function(event){
    
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
    
});

window.addEventListener('resize', function(){
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    init();
    
});

function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    
    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    
    // function for particle movement.
    
    this.update = function(){
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
         if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
        
        // InnerActivity
        
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y -this.y < 50 && mouse.y - this.y > -50){
            
            if(this.radius < maxRadius){
                
                this.radius += 2;
            }
        }
        else if(this.radius > this.minRadius){
            this.radius -= 2;
        }
        
        this.draw();
    }
    
}

//var circle = new Circle(200, 200, 8, 10, 40);
//
//var y = Math.random() * innerHeight;
//var x = Math.random() * innerWidth;
//var dx = (Math.random() - 0.5) * 5;
//var dy = (Math.random() - 0.5) * 5;
//var radius = 50;

var circleArray = [];

function init(){
    
    circleArray = [];
    
    for(var i = 0; i < 700; i++){
        
        var radius = 3;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * 2;
        var dy = (Math.random() - 0.5) * 2;

        circleArray.push(new Circle(x, y, dx, dy, radius));
    
    //var circle = new Circle()
    }
}

function animate() {
    
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    //circle.update();
    
    for(var i = 0; i < circleArray.length; i++){
        
        circleArray[i].update();
    }
}
init();
animate();
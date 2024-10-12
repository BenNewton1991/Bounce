class Vector2D{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    add(movementX, movementY){
        this.x += movementX;
        this.y += movementY;
    }

    scale(scalar){
        this.x *= scalar; 
        this.y *= scalar;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }
}

class Ball{
    constructor(){

        this.position = new Vector2D(Math.random() * 370, Math.random() * 370);
        this.velocity = new Vector2D(Math.random() * 3 + 2, Math.random() * 3 + 2);
        this.size = 10;
        this.color = this.fill_color();
    }

    fill_color(){
        let colors = ["blue","red","green"];
        return colors[Math.floor(Math.random() * 3)];
    }

    update(){
        this.position.add(this.velocity.getX(), this.velocity.getY());

        if (this.position.getX() + 10 > canvas.width || this.position.getX() - 10 < 0){
            this.velocity.x = -this.velocity.x;
        }

        if (this.position.getY() + 10 > canvas.height || this.position.getY() - 10 < 0){
            this.velocity.y = -this.velocity.y;
        }
    }

    draw_circle(){
        context.beginPath();
        context.arc(this.position.getX(), this.position.getY(), this.size, 0, 2 * Math.PI, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath(); 
    }
}

let balls = [];

const button = document.getElementById("add-ball");
button.addEventListener("click", add_ball);

function add_first_ball(){
    balls.push(new Ball);
}

add_first_ball();

function add_ball(){
    var boingSound = new Audio('./Sound/boing.mp3')
    boingSound.play();
    balls.push(new Ball);
}


const canvas = document.getElementById("game-box");
var context = canvas.getContext("2d");


function draw(){
    context.clearRect(0,0,canvas.width, canvas.height);
    for (let i = 0; i < balls.length; i++){
        balls[i].update();
        balls[i].draw_circle();
    }
}


function animate(){
    draw();
    requestAnimationFrame(animate);
}

animate();




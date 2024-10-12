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
        this.velocity = new Vector2D(Math.random() * 2 + 2, Math.random() * 2 + 2);
        this.radius = 20;
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
        context.arc(this.position.getX(), this.position.getY(), this.radius, 0, 2 * Math.PI, false);
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

let counter = 1;

function add_ball(){
    var boingSound = new Audio('./Sound/boing.mp3')
    boingSound.play();
    balls.push(new Ball);
    counter ++;
}


const canvas = document.getElementById("game-box");
var context = canvas.getContext("2d");

canvas.addEventListener('click', function(event){
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    balls.forEach((obj, index) => {
        let dist = Math.sqrt((x - obj.position.getX()) ** 2 + (y - obj.position.getY()) ** 2);
        console.log('worked')
        if (dist < obj.radius + 10) {
            let pop_sound = new Audio('./Sound/pop.mp3');
            pop_sound.play();
            balls.splice(index, 1); 
            draw();
        }
    
    });
});

function draw(){
    context.clearRect(0,0,canvas.width, canvas.height);
    for (let i = 0; i < balls.length; i++){
        if (balls[i] != null){
            balls[i].update();
            balls[i].draw_circle();
        } 
    }
}

function clear_ball(){
    balls = [];
    draw();
}

const clear_button = document.getElementById('clear-ball-button')
clear_button.addEventListener('click', function(){
    clear_ball();
});


function animate(){
    draw();
    requestAnimationFrame(animate);
}

animate();




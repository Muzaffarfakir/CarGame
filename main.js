///////Initiallize ///// variable
let canvas = document.getElementById('canvas');
let score = document.getElementById('score');
let s = 0;
let ani;
let c = canvas.getContext('2d');
let cw = innerWidth;
let ch = innerHeight;
canvas.width = cw;
canvas.height = ch;
let pl = new Image();
pl.src = "bike.png"
let over = new Audio();
let bg = new Audio();
bg.src = "bg.mp3";
over.src = "Over.mp3";
let brick = [];
brick[0] = {
  x: 80,
  y: 320
}
///////////// Player ////////////
class Player {
  constructor({ pos, vel }) {
    this.pos = pos;
    this.w = 124;
    this.h = 48;
    this.vel = vel;
    this.fx = 0;
    this.gameframe = 0;
    this.starngeFrame = 5;
  }
  draw() {
    c.beginPath();
    c.drawImage(pl, this.fx * this.w, this.fx, this.w, this.h, this.pos.x, this.pos.y, 50, 50);
    //c.fillRect(this.pos.x, this.pos.y, this.w, this.h);
    c.stroke();

  }
  update() {
    this.draw();
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    if (this.pos.y + this.h + this.vel.y <= ch) {
      this.vel.y += 0.7;
    }
    else {
      this.vel.y = 0;
    }
    if (this.pos.x + this.vel.x + this.w <= cw) {
      this.vel.x = 0.0001;
    }
    else {
      this.vel.x = 0;
    }
    if (this.gameframe % this.starngeFrame == 0) {

      if (this.fx < 3) {
        this.fx++
      }
      else {
        this.fx = 0;
      }

    }
    this.gameframe++;

  }
}



//////////////instace of player ////
let p = new Player({
  pos: {
    x: 0,
    y: 0
  },
  vel: {
    x: 1,
    y: 0

  }
});
///////////// Bolock Class /////////
class Block {
  constructor({ pos, vel }) {
    this.pos = pos;
    this.vel = vel;
    this.w = 200;
    this.h = 300;

  }
  draw() {
    for (var i = 0; i < brick.length; i++) {
      c.beginPath();
      c.fillRect(brick[i].x, brick[i].y, this.w, this.h);
      c.stroke();

      brick[i].x -= 2;
      if (brick[i].x == 20) {
        brick.push({
          x: 330,
          y: 300
        });
      };
      if (p.pos.y + p.h <= brick[i].y && p.pos.y + p.h + p.vel.y >= brick[i].y && p.pos.x + 50 + p.vel.x >= brick[i].x && p.pos.x <= brick[i].x + 200) {
        p.vel.y = 0
      }
      else if (p.pos.y + p.vel.y + p.h >= ch) {
        bg.pause();
        over.play();
        setTimeout(() => {
          cancelAnimationFrame(ani)
          location.reload(true)
        }, 500)

      }



    }

  };
  update() {
    this.draw();
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  };
};
////////////instance of Block class/
let b = new Block({
  pos: {
    x: 160,
    y: 160
  },
  vel: {
    x: 1,
    y: 0
  }
});
////////// Event listener /////////
window.addEventListener('click', (e) => {
  p.vel.y -= 8;
});
///////// Animate function ////////
function animate() {
  ani = requestAnimationFrame(animate)
  c.clearRect(0, 0, cw, ch);
  p.update();
  b.update();
  score.innerHTML++
  bg.play();



};
animate();

'use strict';

const canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const c2d = canvas.getContext('2d');
const min = 10;
const wmax = window.innerWidth - min;
const hmax = window.innerHeight - min;

// const getRandomPoint = (min,max) => Math.floor((Math.random() ) * max);
// const createLine = (steps, color) => {
//   const x = getRandomPoint(min, wmax);
//   const y = getRandomPoint(min, hmax);
//   c2d.beginPath();
//   c2d.moveTo(x,y);
//   for (let i=0; i<steps; i++) {
//     const x = getRandomPoint(min, wmax);
//     const y = getRandomPoint(min, hmax);
//     console.log(x, y);
//     c2d.lineTo(x, y);
//   }
//   c2d.strokeStyle = color;
//   c2d.stroke();
// };
// for (let i = 0; i < 10; i++) {
//   createLine(30, '#ff7700');
// }


// Squares
// c.fillStyle = '#ffcc00';
// c.fillRect(50,50,50,50);
// c.fillStyle = '#ff9900';
// c.fillRect(100,100,100,100);
// c.fillStyle = '#ff7700';
// c.fillRect(200,200,200,200);


// line
// c.beginPath();
// c.moveTo(50,300);
// c.lineTo(300, 100);
// c.lineTo(500, 300);
// c.strokeStyle = '#840000';
// c.stroke();

// Arc
// c2d.beginPath();
// c2d.arc(200,200,30,0, Math.PI * 2, true);
// c2d.strokeStyle = '#000000';
// c2d.stroke();


function getRandomRGBValue() {
  return Math.floor(Math.random() * 256);
}

function getRandomColor() {
  let result = [];
  for (let i = 0; i < 3; i++) {
    result.push(getRandomRGBValue());
  }
  return result;
}

function Circle(x,y, dx, dy, radius, color, opacity) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;
  this.opacity = opacity;

  this.draw =  function() {
    const [r,g,b] = this.color;
    c2d.beginPath();
    c2d.arc(this.x,this.y,this.radius,0, Math.PI * 2, true);
    c2d.fillStyle = `rgba(${r},${g},${b},${opacity})`;
    c2d.fill();
  };
  this.update = function() {
    if (this.x + this.radius >= innerWidth || this.x - this.radius <= 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius >= innerHeight || this.y - this.radius <= 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };
}

const circles = [];
for (let i = 0; i < 200; i++) {
  const radius = Math.floor(Math.random() * 100);
  const x= Math.random() * (innerWidth - radius * 2) + radius;
  const y= Math.random() * (innerHeight - radius * 2) + radius;
  const dx = (Math.random() - .5) * 14;
  const dy = (Math.random() - .5) * 14;
  let opacity = Math.random() + .2;
  if (opacity > .8) {
    opacity -= Math.random();
  }

  circles.push(new Circle(x,y,dx,dy,radius, getRandomColor(), opacity));
}
console.log(circles);



function animate() {
  requestAnimationFrame(animate);
  c2d.clearRect(0,0, innerWidth, innerHeight);

  for (let i = 0; i < circles.length; i++) {
    circles[i].update();

  }

}

animate();

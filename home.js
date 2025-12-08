let stars = [];
const NUM_STARS = 120;

function setup() {
 
  createCanvas(windowWidth, windowHeight);


  noStroke();


  for (let i = 0; i < NUM_STARS; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      baseSize: random(1.5, 3.5),
      twinkleSpeed: random(0.02, 0.07),
      phase: random(TWO_PI),
      driftX: random(-0.1, 0.1),
      driftY: random(-0.05, 0.05)
    });
  }
}

function draw() {
  
  clear();

  for (let s of stars) {
   
    let twinkle = sin(frameCount * s.twinkleSpeed + s.phase);
    let alpha = map(twinkle, -1, 1, 80, 255);

   
    let size = s.baseSize + map(twinkle, -1, 1, -0.7, 0.7);

    fill(255, 255, 255, alpha);
    ellipse(s.x, s.y, size, size);

  
    s.x += s.driftX;
    s.y += s.driftY;

   
    if (s.x < 0) s.x = width;
    if (s.x > width) s.x = 0;
    if (s.y < 0) s.y = height;
    if (s.y > height) s.y = 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

const imagePaths = [
  "assets/1.png",
  "assets/2.png",
  "assets/3.png",
  "assets/4.png",
  "assets/5.png",
  "assets/6.png",
  "assets/7.png",
  "assets/8.png",
  "assets/9.png",
  "assets/10.png",
  "assets/11.png",
  "assets/12.png",
  "assets/13.png",
  "assets/14.png",
  "assets/15.png",
  "assets/16.png",
  "assets/17.png",
  "assets/18.png"
];

const NUM_IMAGES = imagePaths.length;

const SPAWN_INTERVAL = 10;
const SPAWN_COUNT = 1;

const MAX_ALPHA = 255 * 0.85;
const FADE_SPEED = 0.8;

const MARGIN = 20;
const MIN_SIZE = 80;
const MAX_SIZE = 220;

let imgs = [];
let blurredImgs = [];
let instances = [];


let fadeWrapper = null;

function preload() {
  for (let i = 0; i < imagePaths.length; i++) {
    let img = loadImage(imagePaths[i]);
    imgs.push(img);
  }
}

function setup() {
  fadeWrapper = document.getElementById("intro-canvas-wrapper");

  const cnv = createCanvas(windowWidth, windowHeight);

  if (fadeWrapper) {
    cnv.parent(fadeWrapper);
  } else {
    console.warn(
      "intro-canvas-wrapper not found; canvas will be appended to <body>."
    );
  }

  background(0);


  for (let i = 0; i < imgs.length; i++) {
    let src = imgs[i];
    if (!src) {
      console.warn("Image failed to load at index", i, "path:", imagePaths[i]);
      blurredImgs.push(null);
      continue;
    }
    let g = createGraphics(src.width, src.height);
    g.image(src, 0, 0);
    g.filter(BLUR, 3);
    blurredImgs.push(g);
  }


  window.addEventListener("scroll", handleScroll);
  handleScroll();
}

function draw() {
  background(0);

  if (frameCount % SPAWN_INTERVAL === 0) {
    for (let i = 0; i < SPAWN_COUNT; i++) {
      spawnImageInstance();
    }
  }

  for (let i = instances.length - 1; i >= 0; i--) {
    let inst = instances[i];
    inst.update();
    inst.draw();
    if (inst.isDead()) {
      instances.splice(i, 1);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function spawnImageInstance() {
  if (imgs.length === 0) return;

  let imgIndex = floor(random(imgs.length));
  let src = imgs[imgIndex];
  if (!src) return;

  let w = random(MIN_SIZE, MAX_SIZE);
  let aspect = src.height / src.width;
  let h = w * aspect;

  let x = random(MARGIN, width - MARGIN - w);
  let y = random(MARGIN, height - MARGIN - h);

  let inst = new ImgInstance(imgIndex, x, y, w, h);
  instances.push(inst);
}



class ImgInstance {
  constructor(imgIndex, x, y, w, h) {
    this.imgIndex = imgIndex;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.alpha = MAX_ALPHA;
  }

  update() {
    this.alpha -= FADE_SPEED;
  }

  isDead() {
    return this.alpha <= 0;
  }

  draw() {
    let original = imgs[this.imgIndex];
    let blurred = blurredImgs[this.imgIndex];
    if (!original || !blurred) return;

    let hovering =
      mouseX >= this.x &&
      mouseX <= this.x + this.w &&
      mouseY >= this.y &&
      mouseY <= this.y + this.h;

    let src = hovering ? original : blurred;

    push();
    translate(this.x, this.y);
    let a = constrain(this.alpha, 0, MAX_ALPHA);
    tint(255, a);
    image(src, 0, 0, this.w, this.h);
    pop();
  }
}



function handleScroll() {
  if (!fadeWrapper) return;

  const vh = window.innerHeight;
  const y = window.scrollY;

 
  let progress = y / vh;
  progress = Math.max(0, Math.min(1, progress));

  const opacity = 1 - progress;
  fadeWrapper.style.opacity = opacity;

  if (opacity <= 0.01) {
    fadeWrapper.style.display = "none";
  } else {
    fadeWrapper.style.display = "block";
  }
}

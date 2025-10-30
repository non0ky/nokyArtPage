let keys = new Set();
let codedKeys = new Set();

let im = [];
let x, y, z;
let vel = 5;
let ac = 0;

let names = ['mama', 'papa', 'mapa'];

function preload() {
  im[0] = loadImage('../data/codificación_interna/fase_2a_mama.png');
  im[1] = loadImage('../data/codificación_interna/fase_2a_papa.png');
  im[2] = loadImage('../data/codificación_interna/fase2_papa_mama.png');
}

function setup() {
  const container  = document.querySelector(".p5");
  const canvasSize = container.clientWidth;
  let cnv = createCanvas(canvasSize, canvasSize, WEBGL)
  
  cnv.parent(container);

  imageMode(CENTER);

  x = width / 2;
  y = height / 2;

  let fov = PI / 3.0;
  let aspect = width / height;
  let zH = (im[0].height / 2.0) / tan(fov / 2.0);
  let zW = (im[0].width / 2.0) / tan(fov / 2.0) / aspect;

  z = max(zH, zW);
}

function draw() {
  background(0);

  camera(x, y, z, x, y, 0, 0, 1, 0);

  push();
  translate(0, 0, 0); // en el centro del canvas
  texture(im[ac % 3]);
  plane(im[ac % 3].width, im[ac % 3].height);
  pop();

  updateMovement();
}

function updateMovement() {
  let velSt = vel;
  if (codedKeys.has(CONTROL)) velSt = vel * 2.5;
  if (codedKeys.has(SHIFT)) z -= velSt;

  if (keys.has('w')) y -= velSt;
  if (keys.has('s')) y += velSt;
  if (keys.has('a')) x -= velSt;
  if (keys.has('d')) x += velSt;
  if (keys.has(' ')) z += velSt * 2.5;

  if(z <= 15) z = 95;
}

function keyPressed() {
  if (keyCode === SHIFT || keyCode === CONTROL) {
    codedKeys.add(keyCode);
  } else {
    keys.add(key.toLowerCase());
  }
}

function keyReleased() {
  if (keyCode === SHIFT || keyCode === CONTROL) {
    codedKeys.delete(keyCode);
  } else {
    let k = key.toLowerCase();
    keys.delete(k);

    if (k === 'q') {
      console.log('x:', x, '| y:', y, '| z:', z, '| act:', ac % 3, names[ac % 3]);
    } else if (k === 'e') {
      ac++;
    }
  }
}
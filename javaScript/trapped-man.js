//../data/trapped_man/trapped-" + str(currentIndex) + ".jpg"

let img = [];
let imgInic = 5;
let imgTerm = 920;
let loadedCount = 0;
let currentIndex = imgInic;

let t = 0, i = 0, pxTm = 2, txT;
let prop;
let frase = [
  " dont cry",
  " you are only data, all its okay",
  " all its okay",
  " Look at yourself, how many numbers do you see?"
];

let fraseAct = 0;
let letras = Array.from(frase[fraseAct]);
let nextTime, vel, dir = 1, salto = false;

let loading = true;

function setup() {
  let container = document.querySelector('.p5');
  let canvasSize = getContainerSize();
  let cnv = createCanvas(canvasSize, canvasSize);
  cnv.parent(container);
  console.log(canvasSize);
  txT = canvasSize / 25;
  console.log(txT);

  fill(255);
  frameRate(30);

  loadNextImage();
}

function getContainerSize() {
  const container = document.querySelector(".p5");
  return container.clientWidth;
}

function windowResized() {
  //console.log("wu");
  //print("wuu");
  console.log(canvasSize);
  txT = canvasSize / 25;
  console.log(txT);
  let canvasSize = getContainerSize();
  resizeCanvas(canvasSize, canvasSize);
}

function draw() {
  background(0);

  if (img.length === 0) {
    fill(255);
    textAlign(CENTER, CENTER);
    text("Cargando primeras imágenes...", width / 2, height / 2);
    return;
  }

  loadNextImage();

  nextTime--;

  if (nextTime < 0) {
    nextTime = random(1, 100);
    vel = int(random(1, 15));
    salto = random(10) > 9;
    if (random(10) > 9) t = int(random(img.length));
    dir = random(10) > 5 ? 1 : -1;
    fraseAct = int(random(frase.length));
    letras = Array.from(frase[fraseAct]);
  }

  for (var y = 0; y < img[0].height; y += pxTm) {
    for (var x = 0; x < img[0].width; x += pxTm) {

      i++;
      if (i >= letras.length) i = 0;

      if (salto) {
        t += dir;
        t = (t + img.length) % img.length;
      }

      var px = img[t].get(x, y);
      var il = brightness(px);
      var tm = map(il, 0, 255, 2, txT);

      textSize(tm);
      text(letras[i], (width / 2 - height / 2) + x * prop, y * prop);
    }
  }

  salto = false;

  if (frameCount % vel === 0) {
    t += dir;
    t = (t + img.length) % img.length;
  }
}

// data\trapped_man\trapped-16.jpg
function loadNextImage() {
  if (currentIndex < imgTerm) {
    //console.log("../data/trapped_man/trapped-" + str(currentIndex) + ".jpg");
    let path = "../data/trapped_man/trapped-" + str(currentIndex) + ".jpg";
    loadImage(path, (loadedImage) => {
      img.push(loadedImage);
      loadedCount++;
      currentIndex++;

      if (img.length === 1) {
        // Inicializa después de la primera imagen
        prop = height / loadedImage.height;
        nextTime = int(random(loadedCount));
        vel = int(random(1, 15));
      }

      if (currentIndex >= imgTerm) {
        loading = false;
        console.log("¡Carga completa!");
      }
    });
  }
}

function drawLoadingBar() {
  let progress = loadedCount / (imgTerm - imgInic);
  fill(255);
  textAlign(CENTER);
  textSize(16);
  text("Cargando imágenes... " + int(progress * 100) + "%", width / 2, height / 2 - 30);
  stroke(255);
  noFill();
  rect(width / 4, height / 2, width / 2, 20);
  noStroke();
  fill(150, 200, 255);
  rect(width / 4, height / 2, (width / 2) * progress, 20);
}
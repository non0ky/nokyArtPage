let fra = [' ', 'd', 'o', 'n', 't', ' ', 'c', 'r', 'y', ',', ' ', 'y', 'o', 'u', ' ', 'a', 'r', 'e', ' ', 'o', 'n', 'l', 'y', ' ', 'i', 'n', 'f', 'o', ' ', '•', ' '];
let inst = [];
let pos = 0;

let px = 10;
let video;

function getContainerSize(){
  const container = document.querySelector(".p5");
  return container.clientWidth;
}

function setup() {
  let container = document.querySelector('.p5');
  let canvasSize = getContainerSize();
  let cnv = createCanvas(canvasSize, canvasSize);
  cnv.parent(container);

  background(0);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  
  textAlign(CENTER);
  
  for (let y = 0; y < height ; y += px) {
    inst[y] = [];
    for (let x = 0; x < width; x += px) {
      pos++;
      if (pos > fra.length - 1) {
        pos = 0;
      }
      
      inst[y][x] = fra[pos];
    }
  }
}

function draw() {
  background(0);
  video.loadPixels();
  fill(255);
  
  for (let x = 0; x < width; x += px){
    for (let y = 0; y < height; y += px){
      let i = (x + y * video.width) * 4;
      let r = video.pixels[i + 0];
      let g = video.pixels[i + 1];
      let b = video.pixels[i + 2];
      let lum = (r + g + b) / 3;
      
      let tmñ = floor(map(lum, 0, 255, 0, px * 1.5));
      
      textSize(tmñ);
      text(inst[y][x], x, y);
    }
  }

  function windowResized(){
    //console.log("wu");
    //print("wuu");
    let canvasSize = getContainerSize();
    resizeCanvas(canvasSize, canvasSize);
  }

}

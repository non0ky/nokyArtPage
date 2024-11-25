let fra = [' ', 'd', 'o', 'n', 't', ' ', 'c', 'r', 'y', ',', ' ', 'y', 'o', 'u', ' ', 'a', 'r', 'e', ' ', 'o', 'n', 'l', 'y', ' ', 'i', 'n', 'f', 'o', ' ', '•', ' '];
let inst = [];
let pos = 0;

let px = 20;
let video;

function setup() {
  let c = createCanvas(500, 500);
  let container = select(".p5");
  container.child(c);
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
      
      let tmñ = floor(map(lum, 0, 255, 0, px + 5));

      //fill(random(255), random(255), random(255));
      textSize(tmñ);
      text(inst[y][x], x, y);
    }
  }

}

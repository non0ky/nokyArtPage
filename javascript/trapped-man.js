let img = [];
var imgInic = 5;
var imgTerm = 920;

var t = 0, i = 0, pxTm = 3;
var prop;
var frase = [" don't cry", " you are only data, all its okay", " all its okay", " Look at yourself, how many numbers do you see?" ];
var fraseAct = 0;
var letras = Array.from(frase[fraseAct]);
var nextTime, vel, dir = 1, salto = false;

function preload(){
  for(var i = imgInic; i < imgTerm; i++){
    var path = "../data/data-trappedman/trapped-" + str(i) + ".jpg";
    var loaded_image = loadImage(path);
    img.push(loaded_image);
  }
}

function setup() {
  let c = createCanvas(500, 500);
  let container = select(".p5");
  container.child(c);
  prop = height / img[0].height;
  nextTime = int(random(img.length - 1));
  vel = int(random(1, 15));
  fill(255);
}

function draw() {
  background(0);
  nextTime--;

  if(nextTime < 0){
    nextTime = random(1, 100);
    vel = int(random(1, 15));
    if(random(10) > 9) salto = true;
    if(random(10) > 9) t = int(random(img.length - 1));
    if(random(10) > 5){
      dir = 1;
    } else {
      dir = -1;
    }

    fraseAct = int(random(frase.length));
  }

  for (var y = 0; y < img[0].height; y += pxTm) {
    for (var x = 0; x < img[0].width; x += pxTm) {

      i++;
      if (i >= letras.length) i = 0;

      if (salto == true) {
        t += dir;

        if (t > img.length - 1) t = 0;

        if (t < 0)  t = img.length - 1;
      }

      var px = img[t].get(x, y);
      var il = brightness(px);
      var tm = map(il, 0, 255, 2, 25);

      textSize(tm);
      text(letras[i], (width / 2 - height / 2) + x * prop, y * prop);
    }
  }

  salto = false;

  if (frameCount % vel == 0) t += dir;

  if (t > img.length - 1) t = 0;

  if (t < 0) t = img.length - 1;
}

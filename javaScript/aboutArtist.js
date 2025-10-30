let img;
let cnv;
let nams = [
  "/data/aboutArtist/bun.jpg",
  "/data/aboutArtist/kat.jpg",
  "/data/aboutArtist/api.jpg",
  "/data/aboutArtist/apo.jpg",
];

function preload() {
  img = loadImage(random(nams));
}

function setup() {
  const container = document.querySelector('.p5');
  cnv = createCanvas(100, 100);
  cnv.parent(container);
  colorMode(HSB, 360, 100, 255);
  windowResized();
  frameRate(10);
}

function draw() {
  const fluj = true;
  const px = 2;
  const px2 = 6;
  const scl = width / img.width;
  const offset = createVector(0, (height - img.height * scl) / 2);

  huePixelPalette(img, fluj, px, px2, scl, offset);
}

function windowResized() {
  const container = document.querySelector('.p5');
  if (container) {
    const size = container.clientWidth;
    resizeCanvas(size, size);
  }
}

function huePixelPalette(temp, fluj, _px, _px2, s, offset) {
  const blk = '#22232E';
  const whi = '#F5F5CD';
  const lightLimit = 240;
  const darksLimit = 50;
  const grys = [
    '#242F28', '#2F3831', '#3B403A', '#464943', '#51524C', '#5C5A55',
    '#68635E', '#736C67', '#7E7470', '#8A7D7A', '#958583', '#A08E8C',
    '#AC9795', '#B79F9E', '#C2A8A7', '#CDB1B0', '#D9B9B9', '#E4C2C2'
  ];
  const clrs = [
    ['#F04178', '#D83A69', '#C0335A', '#A82C4C', '#8F243D', '#771D2E', '#5F161F'],
    ['#F185A0', '#DA7594', '#C46588', '#AD557C', '#964570', '#803564', '#692558'],
    ['#E27EF0', '#D376E0', '#C46ED0', '#B566C0', '#A65EB0', '#96569F', '#874E8F', '#78467F', '#693E6F'],
    ['#4F65CE', '#4D5A98', '#2A2F48'],
    ['#89BCD3', '#5C899D', '#37464D'],
    ['#8DD1C4', '#52B9A6', '#4D7C83'],
    ['#7BC1A4', '#44A07A', '#3A5A4D'],
    ['#73B77B', '#4C9053', '#526F55'],
    ['#D1F58F', '#B5F244', '#869D3C'],
    ['#F7DC45', '#EBCA3F', '#DF7A52', '#BB6E4A', '#B06341', '#A45739']
  ];

  //clrs.reverse();

  let px;

  if (fluj) {
    px = floor(map(sin(radians(frameCount)), -1, 1, _px, _px2));
  } else {
    px = _px;
  }

  if (px < 1) {
    px = 1;
  }

  for (let y = 0; y < temp.height; y += px) {
    for (let x = 0; x < temp.width; x += px) {
      const pix = temp.get(x, y);
      const bri = brightness(pix);
      const sat = saturation(pix);

      if (sat < 20) {
        const index = floor(map(bri, 0, 100, 0, grys.length));
        fill(grys[index]);
      } else {
        if (bri < darksLimit) {
          fill(blk);
        } else if (bri > lightLimit) {
          fill(whi);
        } else {
          const h = hue(pix);
          const ind = floor(map(h, 0, 360, 0, clrs.length));
          const bri_ind = floor(map(bri, darksLimit, lightLimit, clrs[ind].length - 1, 0));
          fill(clrs[ind][bri_ind]);
        }
      }
      noStroke();
      rect(x * s + offset.x, y * s + offset.y, px * s, px * s);
    }
  }
}
/*
let img;
const fluj = true;
const px = 8;
const px2 = 16;
let scl;
let offset;

function preload() {
    img = loadImage("https://i.pinimg.com/736x/cb/70/f2/cb70f2191c6567bc9b172af469e668f7.jpg");
}

function getContainerSize(){
  const container = document.querySelector(".p5");
  return container.clientWidth;
}

function setup() {
    let container = document.querySelector('.p5');
    let canvasSize = getContainerSize();
    let cnv = createCanvas(canvasSize, canvasSize);
    cnv.parent(container);

    console.log(width, height);

    colorMode(HSB, 360, 100, 100);

    scl = width / img.width;
    offset = createVector(0, (height - img.height * scl) / 2);
}

function draw(){
    background(0);
    image(img, 0, 0, width, height);
    //huePixelPalette(img, fluj, px, px2, scl, offset);
}

function huePixelPalette(temp, fluj, _px, _px2, s, offset) {
    const blk = '#22232E';
    const whi = '#F5F5CD';

    const lightLimit = 102;
    const darksLimit = 10;

    const grys = [
        '#242F28', '#2F3831', '#3B403A', '#464943', '#51524C', '#5C5A55',
        '#68635E', '#736C67', '#7E7470', '#8A7D7A', '#958583', '#A08E8C',
        '#AC9795', '#B79F9E', '#C2A8A7', '#CDB1B0', '#D9B9B9', '#E4C2C2'
    ];

    const clrs = [
        ['#F04178', '#D83A69', '#C0335A', '#A82C4C', '#8F243D', '#771D2E', '#5F161F'],
        ['#F185A0', '#DA7594', '#C46588', '#AD557C', '#964570', '#803564', '#692558'],
        ['#E27EF0', '#D376E0', '#C46ED0', '#B566C0', '#A65EB0', '#96569F', '#874E8F', '#78467F', '#693E6F'],
        ['#4F65CE', '#4D5A98', '#2A2F48'],
        ['#89BCD3', '#5C899D', '#37464D'],
        ['#8DD1C4', '#52B9A6', '#4D7C83'],
        ['#7BC1A4', '#44A07A', '#3A5A4D'],
        ['#73B77B', '#4C9053', '#526F55'],
        ['#D1F58F', '#B5F244', '#869D3C'],
        ['#F7DC45', '#EBCA3F', '#DFB73A', '#D4A534', '#C8932E', '#BC8029', '#B06E23'],
        ['#F2C771', '#EAB965', '#E2AB59', '#DA9D4D', '#D18F41', '#C98135', '#C17329'],
        ['#DD6375', '#C75667', '#B04958', '#9A3C4A', '#832E3B', '#6D212D', '#56141E'],
        ['#EA9C6B', '#DE9163', '#D3855A', '#C77A52', '#BB6E4A', '#B06341', '#A45739']
    ];

    let px;

    if (fluj) {
        px = floor(map(sin(radians(frameCount)), -1, 1, _px, _px2));
    } else {
        px = _px;
    }

    if (px < 1) {
        px = 1;
    }

    for (let y = 0; y < temp.height; y += px) {
        for (let x = 0; x < temp.width; x += px) {
            const pix = temp.get(x, y);
            const bri = brightness(pix);
            const sat = saturation(pix);

            if (sat < 20) {
                const index = floor(map(bri, 0, 100, 0, grys.length));
                fill(grys[index]);
            } else {
                if (bri < darksLimit) {
                    fill(blk);
                } else if (bri > lightLimit) {
                    fill(whi);
                } else {
                    const h = hue(pix);
                    const ind = floor(map(h, 0, 360, 0, clrs.length));
                    const bri_ind = floor(map(bri, darksLimit, lightLimit, clrs[ind].length - 1, 0));

                    fill(clrs[ind][bri_ind]);
                }
            }

            noStroke();
            rect(x * s + offset.x, y * s + offset.y, px * s, px * s);
        }
    }
}
*/

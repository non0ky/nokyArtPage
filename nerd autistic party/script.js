let capture;
let classifier;
let faces;
let gray;

function onOpenCvReady() {
    console.log("OpenCV.js is ready.");

    if (cv.getBuildInformation) {
        console.log(cv.getBuildInformation());
    }

    // Inicializa los objetos de OpenCV
    classifier = new cv.CascadeClassifier();
    faces = new cv.RectVector(); // Inicializa el RectVector para almacenar las detecciones
    gray = new cv.Mat(); // Inicializa la matriz para la imagen en escala de grises

    // Cargar el clasificador de rostros
    classifier.load('haarcascade_frontalface_default.xml');

    // Ahora puedes continuar con el setup de p5.js
    setup();
}

function setup() {
    // Crear el lienzo y la captura de video
    let canvas = createCanvas(640, 480);
    canvas.parent('canvasContainer');
    capture = createCapture(VIDEO);
    capture.size(640, 480);
    capture.hide();
}

function draw() {
    // Mostrar el video en el lienzo
    image(capture, 0, 0);

    if (cv && classifier && capture.loadedmetadata) {
        // Convertir la imagen a escala de grises
        let src = cv.imread(capture.elt);
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);

        // Detectar rostros
        classifier.detectMultiScale(gray, faces, 1.1, 3, 0);

        // Dibujar rectángulos alrededor de los rostros detectados
        for (let i = 0; i < faces.size(); i++) {
            let face = faces.get(i);
            noFill();
            stroke(0, 255, 0);
            rect(face.x, face.y, face.width, face.height);
        }

        // Liberar la memoria
        src.delete();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

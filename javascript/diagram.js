// Crear los nodos con palabras como etiquetas
var nodes = new vis.DataSet([
    { id: 1, group: 'fisicalObj', label: 'TV', font: { size: 50 } },
    { id: 2, group: 'comun', label: 'Estatica' },
    { id: 3, group: 'comun', label: 'En casa de mis abuelos, la\ntelevisión pasó de ser un\nelemento ocasional a\nacompañar a mi abuela en sus\nlargas noches de trabajo.\nUbicada sobre una mesa de\nping-pong, entre telas y\nmáquias de coser, se\nconvirtió en una señal de\ncompañía.' },
    { id: 4, group: 'comun', label: 'Radiación\nelectromagnetica' },
    { id: 5, group: 'comun', label: 'Fondo de\nradiación cosmica' },

    { id: 6, group: 'fisicalObj', label: 'webcam' },
    { id: 7, group: 'comun', label: 'Processing' },
    { id: 8, group: 'comun', label: 'OpenCV' },
    { id: 9, group: 'archive', label: 'Cascade_FrontalFace.xml' },
    { id: 10, group: 'comun', label: 'Rostros' },

    { id: 11, group: 'archive', label: 'PImage[] faceArray [6]' },
    { id: 12, group: 'if', label: 'if faceArray.length >= 6' },

    { id: 13, group: 'archive', label: 'Hoja de caras.png' },
    { id: 14, group: 'comun', label: 'Python' },
    { id: 15, group: 'if', label: 'if "Hoja de caras.png" is replace' },

    { id: 16, group: 'fisicalObj', label: 'Impresora' },
    { id: 17, group: 'fisicalObj', label: 'Hoja material\ncon seis caras' },
    { id: 18, group: 'fisicalObj', label: 'Papel mural' },

    { id: 19, group: 'archive', label: 'Video' },
    { id: 20, group: 'archive', label: 'Archivo\nteleseries\n2000-2010' },
    { id: 21, group: 'comun', label: 'Recuerdos televisivos' },

    { id: 22, group: 'fisicalObj', label: 'HDMI to RCA' },
    { id: 23, group: 'fisicalObj', label: 'Modulador RF' },
    { id: 24, group: 'noView', label: '' },

]);

// Crear las conexiones entre los nodos
var edges = new vis.DataSet([
    { from: 1, to: 2 },
    { from: 3, to: 1 },
    { from: 1, to: 3 },
    { from: 4, to: 1 },
    { from: 5, to: 4 },

    { from: 6, to: 2, label: '👁️' },
    { from: 6, to: 7, label: 'imagen', dashes: [10, 4] },
    { from: 7, to: 8 },
    { from: 9, to: 8, dashes: [10, 4] },
    { from: 8, to: 10 },

    { from: 10, to: 11 },
    { from: 12, to: 11, label: '👁️' },

    { from: 12, to: 13, label: 'generar' },
    { from: 15, to: 13, label: '👁️' },
    { from: 14, to: 15 },
    { from: 15, to: 16 },
    { from: 16, to: 17 },
    { from: 17, to: 18 },

    { from: 7, to: 19 },
    { from: 20, to: 19, dashes: [10, 4] },
    { from: 21, to: 20 },

    { from: 19, to: 22 },
    { from: 22, to: 23 },
    { from: 23, to: 1 },

    { from: 14, to: 24, label: 'click' },
    { from: 7, to: 12 },
]);

// Crear la red
var container = document.getElementById('mynetwork');
var data = { nodes: nodes, edges: edges };
var options = {
    interaction: {
        zoomView: true, // Permitir zoom
        dragView: true  // Permitir arrastrar el canvas
    },
    groups: {
        useDefaultGroups: false,
        fisicalObj: {
            color: {
                border: 'green',
                background: 'black',
            }
        },
        noView: {
            color: {
                border: 'rgba(255, 255, 255, 0)',
                background: 'rgba(255, 255, 255, 0)',
            }
        },
        archive: {
            color: {
                border: '#FFC300',
                background: 'black'
            }
        },
        if: {
            color: {
                border: '#2cdcd6',
                background: 'black'
            }
        },
        comun: {
            color: {
                border: '#FFFFFF',
                background: '#000000'
            }
        }
    },
    nodes: {

        borderWidth: 1,
        color: { border: '#FFFFFF', background: '#000000' },
        font: {
            color: '#FFFFFF',
            multi: 'md', // Permite saltos de línea con `\n` y distribuye el texto.
            align: 'left'
        },
        shape: 'box',
        shapeProperties: {
            borderRadius: 0
        },
        margin: 10,

    },
    edges: {
        color: '#FFFFFF',
        arrows: {
            to: {
                enabled: true,
                scaleFactor: 0.5,
                type: "arrow"
            }
        },
        smooth: {
            type: 'straightCross'
        },
        font: {
            background: 'black',
            color: 'white',
            strokeWidth: 0
        }
    },
    physics: false // Permitir movimiento
};
var network = new vis.Network(container, data, options);

// Control del zoom con el teclado
document.addEventListener('keydown', function (event) {
    // Obtén el nivel de zoom actual
    let scale = network.getScale();

    if (event.key === 'ArrowUp') {
        // Aumenta el zoom (acercar)
        network.moveTo({
            scale: scale * 1.01 // Incrementa el zoom en un 20%
        });
    } else if (event.key === 'ArrowDown') {
        // Disminuye el zoom (alejar)
        network.moveTo({
            scale: scale * 0.99 // Disminuye el zoom en un 20%
        });
    }
});


// IDs de los nodos que pertenecen al grupo
var PC = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var Tele = [3, 4, 5];

// Función para calcular los límites del grupo y dibujar el rectángulo
function drawGroupRectangle(groupNodes, color) {
    const margin = 120; // Margen uniforme alrededor de todos los nodos

    // Obtener las posiciones de los nodos en el grupo
    var positions = network.getPositions(groupNodes);
    var minX = Math.min(...groupNodes.map(id => positions[id].x));
    var maxX = Math.max(...groupNodes.map(id => positions[id].x));
    var minY = Math.min(...groupNodes.map(id => positions[id].y));
    var maxY = Math.max(...groupNodes.map(id => positions[id].y));

    // Obtener el contexto del canvas de vis.js
    var ctx = network.canvas.getContext();

    // Configurar el estilo del rectángulo
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;

    // Dibujar el rectángulo con un margen uniforme
    ctx.strokeRect(minX - margin, minY - margin, (maxX - minX) + 2 * margin, (maxY - minY) + 2 * margin);

}

network.on("afterDrawing", function () {
    drawGroupRectangle(PC, '#FFFFFF'); // Ejemplo de grupo 1
    drawGroupRectangle(Tele, '#FF5733'); // Ejemplo de grupo 2
});


var nodes = new vis.DataSet([
    { id: 1, group: 'fisicalObj', label: 'TV', font: { size: 50 }, x: 501, y: -289 },
    { id: 2, group: 'comun', label: 'Estatica', x: 420, y: -189 },
    { id: 3, group: 'comun', label: 'En casa de mis abuelos, la\ntelevisión pasó de ser un\nelemento ocasional a\nacompañar a mi abuela en sus\nlargas noches de trabajo.\nUbicada sobre una mesa de\nping-pong, entre telas y\nmáquias de coser, se\nconvirtió en una señal de\ncompañía.', x: 857, y: -374 },
    { id: 4, group: 'comun', label: 'Radiación\nelectromagnetica', x: 849, y: -198 },
    { id: 5, group: 'comun', label: 'Fondo de\nradiación cosmica', x: 852, y: -58 },

    { id: 6, group: 'fisicalObj', label: 'webcam', x: 69, y: -86 },
    { id: 7, group: 'comun', label: 'Processing', x: -160, y: -45 },
    { id: 8, group: 'comun', label: 'OpenCV', x: -345, y: -66 },
    { id: 9, group: 'archive', label: 'Cascade_FrontalFace.xml', x: -309, y: 55 },
    { id: 10, group: 'comun', label: 'Rostros', x: -360, y: -251 },

    { id: 11, group: 'archive', label: 'PImage[] faceArray [6]', x: -224, y: -399 },
    { id: 12, group: 'if', label: 'if faceArray.length >= 6', x: -201, y: -164 },

    { id: 13, group: 'archive', label: 'Hoja de caras.png', x: -76, y: -323 },
    { id: 14, group: 'comun', label: 'Python', x: 225, y: -469 },
    { id: 15, group: 'if', label: 'if "Hoja de caras.png" is replace', x: 0, y: -445 },

    { id: 16, group: 'fisicalObj', label: 'Impresora', x: 208, y: -308 },
    { id: 17, group: 'fisicalObj', label: 'Hoja material\ncon seis caras', x: 465, y: -454 },
    { id: 18, group: 'fisicalObj', label: 'Papel mural', x: 601, y: -538 },

    { id: 19, group: 'archive', label: 'Video', x: 260, y: 99 },
    { id: 20, group: 'archive', label: 'Archivo\nteleseries\n2000-2010', x: 532, y: 164 },
    { id: 21, group: 'comun', label: 'Recuerdos televisivos', x: 415, y: 260 },

    { id: 22, group: 'fisicalObj', label: 'HDMI to RCA', x: 559, y: 23 },
    { id: 23, group: 'fisicalObj', label: 'Modulador RF', x: 467, y: -85 },
    { id: 24, group: 'noView', label: '', x: 281, y: -372 },
]);

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

var container = document.getElementById('mynetwork');
var data = { nodes: nodes, edges: edges };
var options = {
    interaction: {
        zoomView: true,
        dragView: true
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
            multi: 'md',
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
    physics: false
};

var network = new vis.Network(container, data, options);

document.addEventListener('keydown', function (event) {
    let scale = network.getScale();
    if (event.key === 'ArrowUp') {
        network.moveTo({
            scale: scale * 1.01
        });
    } else if (event.key === 'ArrowDown') {
        network.moveTo({
            scale: scale * 0.99
        });
    }
});


var PC = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var Tele = [3, 4, 5];

function drawGroupRectangle(groupNodes, color) {
    const margin = 120;
    var positions = network.getPositions(groupNodes);
    var minX = Math.min(...groupNodes.map(id => positions[id].x));
    var maxX = Math.max(...groupNodes.map(id => positions[id].x));
    var minY = Math.min(...groupNodes.map(id => positions[id].y));
    var maxY = Math.max(...groupNodes.map(id => positions[id].y));

    var ctx = network.canvas.getContext();

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;

    ctx.strokeRect(minX - margin, minY - margin, (maxX - minX) + 2 * margin, (maxY - minY) + 2 * margin);
}

network.on("afterDrawing", function () {
    drawGroupRectangle(PC, '#FFFFFF');
    drawGroupRectangle(Tele, '#FF5733');
});

network.once('afterDrawing', function () {
    network.fit();
});



// Crear la red con nodos y edges
var nodes = new vis.DataSet([
    { id: 1, label: 'nerd autistic party\n(2023)' },
    { id: 2, label: 'conexiones tecno-humanas\n(2024)' },
    { id: 3, label: 'treasure map\n(2023)' },

    { id: 4, label: 'mind-to-node\n(2024)' },
    { id: 5, label: 'internal coding\n(2023)' },
    { id: 6, label: 'dont cry cam\n(2022)' },
    { id: 7, label: 'la tele y sus fantasmas\n(tesis)\n(2024)' },
    { id: 8, label: 'trappedman\n(2024)' },
    { id: 9, label: 'via del tren (quilicura)\n(2023)' }
]);

let links = [
    "",
    "",
    "../treasureMap/treasureMap.html",

    "../nodos/nodos.html",
    "../codificacion interna/codificacion.html",
    "../dontcrycam/dontcrycamIndex.html",
    "",
    "../trappedMan/trappedMan.html",
    "../linea de tren-quilicura/linea de tren-quilicura.html"
];

var edges = new vis.DataSet([
    { from: 2, to: 4 },
    { from: 6, to: 5 },
    { from: 5, to: 1 },
    { from: 1, to: 2 },
    { from: 2, to: 7 },
    { from: 6, to: 8 },
    { from: 3, to: 9 },
    { from: 3, to: 2 },
]);

var container = document.getElementById('mynetwork');
var data = {
    nodes: nodes,
    edges: edges
};

// Opciones para el estilo de los nodos y edges
var options = {
    nodes: {
        shape: 'box',
        color: {
            background: 'black',
            border: 'white',
            hover : {
                background: 'white',
                border : 'yellow',
                color: 'black'
            }
        },
        font: {
            color: 'white'
        },
        size: 15  // Ajusta el tamaño del nodo aquí
    },
    edges: {
        color: 'white',
        arrows: {
            to: { enabled: true, scaleFactor: 0.5 } // Añadir flechas al final de los edges
        }
    },
    layout: {
        improvedLayout: false
    }
};

var network = new vis.Network(container, data, options);

// Función para manejar el clic en los nodos
network.on("click", function (params) {
    if (params.nodes.length > 0) {
        var nodeId = params.nodes[0];
        handleNodeClick(nodeId);
    }
});

function handleNodeClick(nodeId) {
    window.location.href = links[nodeId - 1];
    //switch (nodeId) {
    //    case 1:
    //        window.location.href = 'http://www.example.com/page1'; // Redirigir a página 1
    //        break;
    //    case 2:
    //        window.location.href = 'http://www.example.com/page2'; // Redirigir a página 2
    //        break;
    //    case 3:
    //        window.location.href = 'http://www.example.com/page3'; // Redirigir a página 3
    //        break;
    //    default:
    //        alert('Nodo sin acción definida.');
    //}
}
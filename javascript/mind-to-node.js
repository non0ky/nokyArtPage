
let panel = document.getElementById('panel');

var nodes = new vis.DataSet([
    { id: 1, label: 'not' },
    { id: 2, label: 'onLoad' }
]);

var edges = new vis.DataSet([
    { from: 1, to: 2 }
]);

var container = document.getElementById('mynetwork');
var data = {
    nodes: nodes,
    edges: edges
};
var options = {};
var network = new vis.Network(container, data, options);

var currentPathLabels = [];
var speech = new p5.Speech(); // Crear un objeto p5.Speech

// Llenar el desplegable con las voces disponibles
speech.onLoad = function () {
    var voiceSelect = document.getElementById('voiceSelect');
    speech.voices.forEach(function (voice, index) {
        var option = document.createElement('option');
        option.value = index;
        option.text = voice.name;
        voiceSelect.appendChild(option);
    });
};

// Opciones para el estilo de los nodos
var nodeOptions = {
    shape: 'box',
    shapeProperties: {
        borderRadius: 0
    },
    color: {
        background: 'black',
        border: 'white',
        highlight: {
            background: 'gray',
            border: 'white'
        },
        hover: {
            border: '#2B7CE9',
            background: '#D2E5FF'
        }
    },
    font: {
        color: 'white'
    }
};

// Opciones para el estilo de los edges
var edgeOptions = {
    color: {
        color: 'white'
    },
    smooth: false
};

// Aplicar estilos al network
function applyStyles() {
    network.setOptions({
        nodes: nodeOptions,
        edges: edgeOptions,
        layout: {
            improvedLayout: false // Desactivar el layout mejorado si es necesario
        }
    });
}

// Llamar a la función para aplicar los estilos al inicializar el network
applyStyles();

function addNode() {
    var nodeLabel = document.getElementById('nodeLabel').value;
    if (nodeLabel.trim() === "") {
        alert("Por favor, ingrese un label para el nodo.");
        return;
    }
    var newNodeId = nodes.length + 1;
    nodes.add({ id: newNodeId, label: nodeLabel });

    // Crear conexiones aleatorias para el nuevo nodo sin repeticiones
    var connectedNodes = new Set();
    var numberOfConnections = Math.floor(Math.random() * 3);

    for (var i = 0; i < numberOfConnections; i++) {
        var randomNode = getRandomNode();
        while (randomNode === newNodeId || connectedNodes.has(randomNode)) {
            randomNode = getRandomNode(); // Evitar auto-conexiones y repeticiones
        }
        connectedNodes.add(randomNode);
        edges.add({ from: newNodeId, to: randomNode });
    }

    document.getElementById('nodeLabel').value = "";
    updateSliders(); // Actualizar los sliders
}

function getRandomNode() {
    var allNodes = nodes.get();
    var randomIndex = Math.floor(Math.random() * allNodes.length);
    return allNodes[randomIndex].id;
}

function reorganizeConnections() {
    edges.clear();
    var allNodes = nodes.get();

    for (var i = 0; i < allNodes.length; i++) {
        var connectedNodes = new Set();
        var numberOfConnections = Math.floor(Math.random() * 3);

        for (var j = 0; j < numberOfConnections; j++) {
            var randomNode = getRandomNode();
            while (randomNode === i || connectedNodes.has(randomNode)) {
                randomNode = getRandomNode(); // Evitar auto-conexiones y repeticiones
            }
            connectedNodes.add(randomNode);
            edges.add({ from: i, to: randomNode });
        }
    }
}



function updateSliders() {
    var nodeCount = nodes.length;
    document.getElementById('startNode').max = nodeCount;
    document.getElementById('endNode').max = nodeCount;
    document.getElementById('deleteNode').max = nodeCount;
    document.getElementById('startNode').value = Math.min(document.getElementById('startNode').value, nodeCount);
    document.getElementById('endNode').value = Math.min(document.getElementById('endNode').value, nodeCount);
    document.getElementById('deleteNode').value = Math.min(document.getElementById('deleteNode').value, nodeCount);

    // Actualizar slider de selección de nodo inicial
    var startNodeSlider = document.getElementById('startNode');
    startNodeSlider.max = nodeCount;

    // Actualizar slider de selección de nodo final
    var endNodeSlider = document.getElementById('endNode');
    endNodeSlider.max = nodeCount;

    // Actualizar slider de eliminación de nodos
    var deleteNodeSlider = document.getElementById('deleteNode');
    deleteNodeSlider.max = nodeCount;

    startNodeSlider.value = Math.min(startNodeSlider.value, nodeCount - 1);
    endNodeSlider.value = Math.min(endNodeSlider.value, nodeCount - 1);
    deleteNodeSlider.value = Math.min(deleteNodeSlider.value, nodeCount - 1);

    updateStartNodeValue();
    updateEndNodeValue();
    updateDeleteNodeValue();
}

function updateStartNodeValue() {
    var startNodeValue = document.getElementById('startNode').value;
    document.getElementById('startNodeValue').innerText = startNodeValue;
    highlightSelectedNodes();
}

function updateEndNodeValue() {
    var endNodeValue = document.getElementById('endNode').value;
    document.getElementById('endNodeValue').innerText = endNodeValue;
    highlightSelectedNodes();
}

function findPath(startNode, endNode) {
    var adjacencyList = {};

    edges.forEach(edge => {
        if (!adjacencyList[edge.from]) {
            adjacencyList[edge.from] = [];
        }
        adjacencyList[edge.from].push(edge.to);

        // Si es un grafo no dirigido, agregar la arista inversa
        if (!adjacencyList[edge.to]) {
            adjacencyList[edge.to] = [];
        }
        adjacencyList[edge.to].push(edge.from);
    });

    var queue = [startNode];
    var visited = {};
    var parent = {};

    visited[startNode] = true;

    while (queue.length > 0) {
        var currentNode = queue.shift();

        if (currentNode === endNode) {
            // Encontramos el nodo de destino
            var path = [];
            var temp = endNode;

            while (temp !== undefined) {
                path.push(temp);
                temp = parent[temp];
            }

            path.reverse();
            return path; // Devolver la lista de nodos en el camino
        }

        if (adjacencyList[currentNode]) {
            adjacencyList[currentNode].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    parent[neighbor] = currentNode;
                    queue.push(neighbor);
                }
            });
        }
    }

    return null; // No se encontró un camino
}

function findLongestPath(startNode, endNode) {
    var adjacencyList = {};

    edges.forEach(edge => {
        if (!adjacencyList[edge.from]) {
            adjacencyList[edge.from] = [];
        }
        adjacencyList[edge.from].push(edge.to);

        // Si es un grafo no dirigido, agregar la arista inversa
        if (!adjacencyList[edge.to]) {
            adjacencyList[edge.to] = [];
        }
        adjacencyList[edge.to].push(edge.from);
    });

    var longestPath = [];
    var visited = {};

    function dfs(currentNode, path) {
        visited[currentNode] = true;
        path.push(currentNode);

        if (currentNode === endNode) {
            if (path.length > longestPath.length) {
                longestPath = path.slice(); // Guardar copia del camino actual
            }
        } else {
            if (adjacencyList[currentNode]) {
                adjacencyList[currentNode].forEach(neighbor => {
                    if (!visited[neighbor]) {
                        dfs(neighbor, path);
                    }
                });
            }
        }

        path.pop();
        visited[currentNode] = false;
    }

    dfs(startNode, []);

    return longestPath.length > 0 ? longestPath : null; // Devolver la lista de nodos en el camino más largo
}

function findRandomPath() {
    var startNode = getRandomNode();
    var endNode = getRandomNode();

    // Asegurarse de que los nodos de inicio y fin no sean el mismo
    while (endNode === startNode) {
        endNode = getRandomNode();
    }

    // Establecer los valores de los sliders a los nodos aleatorios
    document.getElementById('startNode').value = startNode;
    document.getElementById('endNode').value = endNode;

    // Llamar a la función para encontrar y resaltar el camino
    findAndHighlightPath();
}

function clearPathHighlight() {
    edges.update(edges.get().map(edge => {
        return { id: edge.id, color: { color: 'white' } };
    }));
}

function highlightPath(path) {
    clearPathHighlight(); // Limpiar el resaltado anterior

    currentPathLabels = [];

    for (var i = 0; i < path.length - 1; i++) {
        var from = path[i];
        var to = path[i + 1];
        var edgeId = edges.get({
            filter: function (edge) {
                return (edge.from === from && edge.to === to) || (edge.from === to && edge.to === from);
            }
        })[0].id;
        edges.update({ id: edgeId, color: { color: 'red' } });

        currentPathLabels.push(nodes.get(from).label);
    }
    currentPathLabels.push(nodes.get(path[path.length - 1]).label); // Agregar el label del nodo final

    panel.innerHTML = `
    <p> ${currentPathLabels.join(', ')}</p>
    `;
}

function findAndHighlightPath() {
    var startNode = parseInt(document.getElementById('startNode').value);
    var endNode = parseInt(document.getElementById('endNode').value);
    var path = findLongestPath(startNode, endNode);
    if (path) {
        highlightPath(path);
    } else {
        alert("No se encontró un camino entre los nodos seleccionados.");
    }
}

function findAndHighlightlongerPath() {
    var startNode = parseInt(document.getElementById('startNode').value);
    var endNode = parseInt(document.getElementById('endNode').value);
    var path = findPath(startNode, endNode);
    if (path) {
        highlightPath(path);
    } else {
        alert("No se encontró un camino entre los nodos seleccionados.");
    }
}

function highlightSelectedNodes() {
    var startNode = parseInt(document.getElementById('startNode').value);
    var endNode = parseInt(document.getElementById('endNode').value);
    var highlightCheck = document.getElementById('highlightCheck').checked;

    var updatedNodes = nodes.map(node => {
        if (highlightCheck && (node.id === startNode || node.id === endNode)) {
            return { ...node, color: { background: 'red', border: 'white' } };
        } else {
            return { ...node, color: { background: 'black', border: 'white' } };
        }
    });

    nodes.update(updatedNodes);
}

function toggleNodeHighlight() {
    highlightSelectedNodes();
}

function speakPathLabels() {
    updateSpeechVoice();
    var labelsString = currentPathLabels.join(', ');
    speech.speak(labelsString); // Hablar el string de labels
}

function stopSpeech() {
    speech.stop(); // Detiene la voz del objeto p5.Speech
}

function updateSpeechVoice() {
    let speechVoices = speech.voices;
    var voiceIndex = document.getElementById('voiceSelect').value;
    speech.setVoice(speechVoices[voiceIndex].name);
    console.log(speechVoices[voiceIndex].name);
}

function updateSpeechSpeed() {
    var speed = document.getElementById('speechSpeed').value;
    document.getElementById('speechSpeedValue').innerText = speed;
    speech.setRate(speed);
}

function updateSpeechPitch() {
    var pitch = document.getElementById('speechPitch').value;
    document.getElementById('speechPitchValue').innerText = pitch;
    speech.setPitch(pitch);
}

function updateSpeechVolume() {
    var volume = document.getElementById('speechVolume').value;
    document.getElementById('speechVolumeValue').innerText = volume;
    speech.setVolume(volume);
}

function updateDeleteNodeValue() {
    var deleteNodeValue = document.getElementById('deleteNode').value;
    document.getElementById('deleteNodeValue').innerText = deleteNodeValue;
    highlightDeleteNode();
}

function highlightDeleteNode() {
    var deleteNodeValue = parseInt(document.getElementById('deleteNode').value);
    var deleteHighlightCheck = document.getElementById('deleteHighlightCheck').checked;

    var updatedNodes = nodes.map(node => {
        if (deleteHighlightCheck && node.id === deleteNodeValue) {
            return { ...node, color: { background: 'orange', border: 'white' } };
        } else {
            return { ...node, color: { background: 'black', border: 'white' } };
        }
    });

    nodes.update(updatedNodes);
}

function deleteNode() {
    var deleteNodeValue = parseInt(document.getElementById('deleteNode').value);

    nodes.remove({ id: deleteNodeValue });
    edges.remove(edges.get({
        filter: function (edge) {
            return edge.from === deleteNodeValue || edge.to === deleteNodeValue;
        }
    }));

    // Actualizar IDs de los nodos restantes
    var remainingNodes = nodes.get();
    remainingNodes.forEach(node => {
        if (node.id > deleteNodeValue) {
            var newId = node.id - 1;
            var nodeLabel = node.label;
            edges.update(edges.get({
                filter: function (edge) {
                    return edge.from === node.id || edge.to === node.id;
                }
            }).map(edge => {
                return {
                    id: edge.id,
                    from: (edge.from === node.id) ? newId : edge.from,
                    to: (edge.to === node.id) ? newId : edge.to
                };
            }));
            nodes.update({ id: node.id, label: nodeLabel, id: newId });
        }
    });

    updateSliders(); // Actualizar los sliders
    highlightDeleteNode(); // Actualizar la visualización
}

// Inicializar los valores de los sliders
updateSliders();


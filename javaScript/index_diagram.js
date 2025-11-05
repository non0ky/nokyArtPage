var nodes = new vis.DataSet([
  { id: 1, label: 'conexiones tecno-humanas\n(nexo)', x: -9, y: 38 },
  { id: 2, label: 'entidades perifericas\n(nexo)', x: 130, y: -24 },
  { id: 3, label: 'mind-to-node\n(2024)', x: -88, y: 156 },
  { id: 4, label: 'internal coding\n(2023)', x: -49, y: -102 },
  { id: 5, label: 'dont cry cam\n(2022)', x: -170, y: -133 },
  { id: 6, label: 'la televisión de mi abuelita\n(tesis)\n(2024)', x: 66, y: 160 },
  { id: 7, label: 'trapped-man\n(2024)', x: -148, y: -11 },
  { id: 8, label: 'via del tren (quilicura)\n(2023)', x: 154, y: -156 },
  { id: 9, label: 'ruido blanco\n(2025)', x: 250, y: 36 },
]);

let links = [
  "../html/conexiones_tecnohumanas.html", // (twt)
  "../html/entidades_perifericas.html", // 8.8

  "../html/nodes.html", // (i.i)
  "../html/internal_coding.html", // (qvq)
  "../html/dontcrycam.html", // (. .)
  "../html/television_abuelita.html", // o,,,,o

  "../html/trapped_man.html", // (.-.)
  "../html/new_linea_tren.html", // (-_-)
  "../html/ruido_blanco.html",
];

var edges = new vis.DataSet([
  { from: 1, to: 3 },
  { from: 5, to: 4 },
  { from: 4, to: 1 },

  { from: 1, to: 6 },
  { from: 5, to: 7 },
  { from: 2, to: 8 },
  { from: 2, to: 1 },
  { from: 7, to: 1 },
  { from: 2, to: 9 },
]);

var container = document.getElementById('network');
var data = {
  nodes: nodes,
  edges: edges
};

var options = {
  nodes: {
    chosen: false,
    shape: 'box',
    color: {
      background: 'black',
      border: 'white',
    },
    font: {
      color: 'white'
    },
    size: 15
  },
  edges: {
    color: 'white',
    arrows: {
      to: { enabled: true, scaleFactor: 0.5 }
    },
  },
  interaction: {
    hover: true
  },
  layout: {
    improvedLayout: false
  }
};

var network = new vis.Network(container, data, options);

network.on("click", function (params) {
  if (params.nodes.length > 0) {
    var nodeId = params.nodes[0];
    handleNodeClick(nodeId);
  }
});

function handleNodeClick(nodeId) {
  window.location.href = links[nodeId - 1];
}

let blinkNodeId = null;
let blinkInterval = null;
let blinkToggle = false;
let originalColors = {};

network.on("hoverNode", function (params) {
  const nodeId = params.node;
  blinkNodeId = nodeId;

  const node = nodes.get(nodeId);
  originalColors[nodeId] = {
    border: node.color?.border || 'white',
    background: node.color?.background || 'black',
    font: node.font?.color || 'white'
  };

  blinkInterval = setInterval(() => {
    blinkToggle = !blinkToggle;
    nodes.update({
      id: nodeId,
      color: {
        border: blinkToggle ? 'white' : 'black',
        background: originalColors[nodeId].background
      }
    });
  }, 10);
});

network.on("blurNode", function (params) {
  const nodeId = params.node;
  clearInterval(blinkInterval);
  blinkInterval = null;

  if (originalColors[nodeId]) {
    nodes.update({
      id: nodeId,
      color: {
        border: originalColors[nodeId].border,
        background: originalColors[nodeId].background
      },
      font: {
        color: originalColors[nodeId].font
      }
    });
  }

  blinkNodeId = null;
});

function guardarPosiciones() {
  var positions = network.getPositions();
  var allNodes = nodes.get();

  var output = "";
  allNodes.forEach(function (node) {
    var pos = positions[node.id];
    var fixedLabel = node.label ? node.label.replace(/\n/g, '\\n') : '';

    output += `{ id: ${node.id}, label: '${fixedLabel}', x: ${Math.round(pos.x)}, y: ${Math.round(pos.y)} },\n`;
  });

  console.log(output);
}
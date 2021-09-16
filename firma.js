//======================================================================
// VARIABLES
//======================================================================
let miCanvas = document.querySelector("#pizarra");
let lineas = [];
let correccionX = 0;
let correccionY = 0;
let pintarLinea = false;
// Marca el nuevo punto
let nuevaPosicionX = 0;
let nuevaPosicionY = 0;

let posicion = miCanvas.getBoundingClientRect();
correccionX = posicion.x;
correccionY = posicion.y;

miCanvas.width = 500;
miCanvas.height = 500;

//======================================================================
// BANDERA PARA CANVAS
//======================================================================
let canvasOn = false;

//======================================================================
// FUNCIONES
//======================================================================

/**
 * Funcion que empieza a dibujar la linea
 */
function empezarDibujo() {
  pintarLinea = true;
  lineas.push([]);
}

/**
 * Funcion que guarda la posicion de la nueva línea
 */
function guardarLinea() {
  lineas[lineas.length - 1].push({
    x: nuevaPosicionX,
    y: nuevaPosicionY,
  });
}

/**
 * Funcion dibuja la linea
 */
function dibujarLinea(event) {
  event.preventDefault();
  if (pintarLinea) {
    let ctx = miCanvas.getContext("2d");
    // Estilos de linea
    ctx.lineJoin = ctx.lineCap = "round";
    ctx.lineWidth = 3;
    // Color de la linea
    ctx.strokeStyle = "#0D0909";
    // Marca el nuevo punto
    if (event.changedTouches == undefined) {
      // Versión ratón
      nuevaPosicionX = event.layerX;
      nuevaPosicionY = event.layerY;
    } else {
      // Versión touch, pantalla tactil
      nuevaPosicionX = event.changedTouches[0].pageX - correccionX;
      nuevaPosicionY = event.changedTouches[0].pageY - correccionY;
    }
    // Guarda la linea
    guardarLinea();
    // Redibuja todas las lineas guardadas
    ctx.beginPath();
    lineas.forEach(function (segmento) {
      ctx.moveTo(segmento[0].x, segmento[0].y);
      segmento.forEach(function (punto, index) {
        ctx.lineTo(punto.x, punto.y);
      });
    });
    ctx.stroke();
  }
}

/**
 * Funcion que deja de dibujar la linea
 */
function pararDibujar() {
  pintarLinea = false;
  guardarLinea();
}

// function clearCanvas() {
//   // var canvas = document.getElementById("myCanvasID");
//   var context = miCanvas.getContext("2d");
//   context.clearRect(0, 0, miCanvas.width, miCanvas.height); //clear html5 canvas
//   miCanvas.remove();
// }

function crearCanvas() {
  const panelCanvasCliente = document.querySelector("#panel-canvas-cliente");
  panelCanvasCliente.innerHTML += `<canvas id="pizarra"></canvas>`;
}

//======================================================================
// EVENTOS
//======================================================================

// Eventos raton
miCanvas.addEventListener("mousedown", empezarDibujo, false);
miCanvas.addEventListener("mousemove", dibujarLinea, false);
miCanvas.addEventListener("mouseup", pararDibujar, false);

let addFirma = document.querySelector("#firmaTecnico");
addFirma.addEventListener("click", () => {
  console.log("canvas", canvasOn);
  if (canvasOn) {
    crearCanvas();
  }
});

let cancelar = document.querySelector("#btnCancelar");
cancelar.addEventListener("click", () => {
  console.log("canvas", canvasOn);
  miCanvas.remove();
  canvasOn = true;
});

// document.getElementById("btnClean").addEventListener("click", limpiar, false);

// Eventos pantallas táctiles
miCanvas.addEventListener("touchstart", empezarDibujo, false);
miCanvas.addEventListener("touchmove", dibujarLinea, false);

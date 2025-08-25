// Const obtiene modo de juego
const modoJuego = localStorage.getItem("modoJuego");

const btnReiniciar = document.getElementById("btnReiniciar");
const mensajeGanador = document.getElementById("mensajeGanador");
const mensajeTurnoJugador = document.getElementById("mensajeTurnoJugador");

const celdas = document.getElementsByClassName("celda");

// Constantes para el modal que solicita nombre y ficha de juego al usuario
const modalJugadores = document.getElementById("modalJugadores");
const btnComenzar = document.getElementById("btnComenzar");
const btnFicha = document.getElementsByClassName("btnFicha");

let turno = true;

let juegoActivo = true;

let tablero = ["", "", "", "", "", "", "", "", ""];

let fichaJugador1 = null;
let fichaJugador2 = null;

const nombreJugador1 = document.getElementById("nombreJugador1");
const nombreJugador2 = document.getElementById("nombreJugador2");

// Lista de combinaciones posibles para ganar
const combinacionesGanadoras = [
  [0, 1, 2], // h
  [3, 4, 5], // h
  [6, 7, 8], // h
  [0, 3, 6], // v
  [1, 4, 7], // v
  [2, 5, 8], // v
  [0, 4, 8], // d
  [2, 4, 6], // d
];

// Función para mostrar en pantalla el turno de cada jugador
function actualizarMensajeTurno() {
  if (turno === true) {
    mensajeTurnoJugador.textContent = "JUGADOR " + nombreJugador1.value;
  } else {
    if (modoJuego === "dosJugadores") {
      mensajeTurnoJugador.textContent = "JUGADOR " + nombreJugador2.value;
    } else {
      mensajeTurnoJugador.textContent = "COMPUTADORA";
    }
  }
}
actualizarMensajeTurno();

// Función para verificar ganador
function verificarGanador() {
  for (let index = 0; index < combinacionesGanadoras.length; index++) {
    const [a, b, c] = combinacionesGanadoras[index];

    // verifica si las casillas son iguales
    if (
      tablero[a] !== "" &&
      tablero[a] === tablero[b] &&
      tablero[a] === tablero[c]
    ) {
      celdas[a].classList.add("ganador");
      celdas[b].classList.add("ganador");
      celdas[c].classList.add("ganador");

      return tablero[a];
    }
  }
  return null;
}

// Función para verificar si hay empate
function verificarEmpate() {
  for (let index = 0; index < tablero.length; index++) {
    if (tablero[index] === "") {
      return false;
    }
  }
  return true;
}

// ESTADISTICA DE JUGADORES
let estadisticasJuego = JSON.parse(localStorage.getItem("estadisticasJuego")) || {
  victoriasJugador1: 0,
  victoriasJugador2: 0,
  empates: 0,
};

// Función para incrementar contadores usando for
function incrementarContadorResultado(resultado) {
  let claves = ["victoriasJugador1", "victoriasJugador2", "empates"];
  let resultados = ["Jugador1", "Jugador2", "Empate"];

  for (let index = 0; index < resultados.length; index++) {
    if (resultado === resultados[index]) {
      estadisticasJuego[claves[index]] += 1;
    }
  }

  actualizarEstadisticas();
}

// Mostrar modal y ocultar jugador 2 si es modo un jugador
if (modoJuego === "unJugador" || modoJuego === "dosJugadores") {
  modalJugadores.style.display = "flex";

  if (modoJuego === "unJugador") {
    document.getElementById("jugador2").style.display = "none";
  } else {
    document.getElementById("jugador2").style.display = "block";
  }
}

// Selección de fichas
for (let index = 0; index < btnFicha.length; index++) {
  btnFicha[index].addEventListener("click", function () {
    for (let j = 0; j < btnFicha.length; j++) {
      btnFicha[j].classList.remove("seleccionado");
    }

    btnFicha[index].classList.add("seleccionado");

    const ficha = btnFicha[index].getAttribute("data-ficha");
    if (index < 3) {
      fichaJugador1 = ficha;
    } else {
      fichaJugador2 = ficha;
    }
  });
}

// Evento único para btnComenzar
btnComenzar.addEventListener("click", function () {
  if (modoJuego === "unJugador") {
    if (nombreJugador1.value.trim() === "" || !fichaJugador1) {
      alert("Escribe tu nombre y elije la ficha.");
      return;
    }

    // Selección aleatoria de ficha computadora
    let disponibles = [];
    for (let index = 3; index < btnFicha.length; index++) {
      let fichaBot = btnFicha[index].getAttribute("data-ficha");
      if (fichaBot !== fichaJugador1) disponibles.push(fichaBot);
    }
    fichaJugador2 = disponibles[Math.floor(Math.random() * disponibles.length)];
    nombreJugador2.value = "COMPUTADORA";
  } else {
    // Validación para dos jugadores
    if (
      nombreJugador1.value.trim() === "" ||
      nombreJugador2.value.trim() === ""
    ) {
      alert("Por favor, escribe los nombres de ambos jugadores.");
      return;
    }

    if (!fichaJugador1 || !fichaJugador2) {
      alert("Por favor, selecciona las fichas de ambos jugadores.");
      return;
    }

    if (fichaJugador1 === fichaJugador2) {
      alert("Cada jugador debe tener una ficha diferente.");
      return;
    }
  }

  // Guardar datos en localStorage
  localStorage.setItem("nombreJugador1", nombreJugador1.value);
  localStorage.setItem("nombreJugador2", nombreJugador2.value);
  localStorage.setItem("fichaJugador1", fichaJugador1);
  localStorage.setItem("fichaJugador2", fichaJugador2);

  modalJugadores.style.display = "none";
  actualizarMensajeTurno();
});

// CLICK EN LAS CELDAS
for (let index = 0; index < celdas.length; index++) {
  const element = celdas[index];

  celdas[index].addEventListener("click", function () {
    if (!juegoActivo) {
      return;
    }

    if (tablero[index] !== "") {
      return;
    }

    let jugadorActual;

    if (turno) {
      jugadorActual = fichaJugador1;
    } else {
      jugadorActual = fichaJugador2;
    }

    element.innerHTML =
      "<img src='" + jugadorActual + "' alt='Ficha' class='ficha-img'>";
    tablero[index] = jugadorActual;

    const ganador = verificarGanador();
    if (ganador) {
      let nombreGanador;
      let resultado;

      if (turno) {
        nombreGanador = nombreJugador1.value;
        resultado = "Jugador1";
      } else {
        nombreGanador = nombreJugador2.value;
        resultado = "Jugador2";
      }
      mensajeGanador.textContent = "! FELICIDADES JUGADOR: " + nombreGanador + " !";
      juegoActivo = false;
      incrementarContadorResultado(resultado);
      return;
    }

    if (verificarEmpate()) {
      mensajeGanador.textContent = "¡EMPATE!";
      juegoActivo = false;
      incrementarContadorResultado("Empate");
      return;
    }

    turno = !turno;

    actualizarMensajeTurno();

    if (!turno && modoJuego === "unJugador") {
      setTimeout(movComputadora, 1000);
    }
  });
}

// Botón reinicia el tablero del juego
btnReiniciar.addEventListener("click", function () {
  for (let index = 0; index < celdas.length; index++) {
    celdas[index].innerHTML = "";
    celdas[index].classList.remove("ganador");
  }

  mensajeGanador.textContent = "";
  turno = true;
  tablero = ["", "", "", "", "", "", "", "", ""];
  juegoActivo = true;
  actualizarMensajeTurno();
});

// Función para jugar contra la computadora
function movComputadora() {
  if (!juegoActivo) return;

  let celdasDisponibles = [];

  for (let index = 0; index < tablero.length; index++) {
    if (tablero[index] === "") {
      celdasDisponibles.push(index);
    }
  }

  if (celdasDisponibles.length === 0) {
    return;
  }

  let aleatorio = Math.floor(Math.random() * celdasDisponibles.length);
  let eleccion = celdasDisponibles[aleatorio];

  tablero[eleccion] = fichaJugador2;
  celdas[eleccion].innerHTML =
    "<img src='" + fichaJugador2 + "' class='ficha-img'>";

  const ganador = verificarGanador();
  if (ganador) {
    mensajeGanador.textContent = "! FELICIDADES " + nombreJugador2.value + " !";
    juegoActivo = false;
    return;
  }

  if (verificarEmpate()) {
    mensajeGanador.textContent = "¡EMPATE!";
    juegoActivo = false;
    return;
  }

  turno = !turno;

  actualizarMensajeTurno();
}

// Modal del botón estadísticas
const btnEstadistica = document.getElementById("btnEstadistica");
const modalEstadisticas = document.getElementById("modalEstadisticas");
const btnCerrarEstadis = document.getElementById("btnCerrarEstadis");
const btnReiniciarEstadis = document.getElementById("btnReiniciarEstadis");

btnEstadistica.addEventListener("click", function () {
  actualizarEstadisticas();
  modalEstadisticas.style.display = "flex";
});

btnCerrarEstadis.addEventListener("click", function () {
  modalEstadisticas.style.display = "none";
});

btnReiniciarEstadis.addEventListener("click", function () {
  estadisticasJuego = { victoriasJugador1: 0, victoriasJugador2: 0, empates: 0 };
  actualizarEstadisticas();
});

function actualizarEstadisticas() {
  localStorage.setItem("estadisticasJuego", JSON.stringify(estadisticasJuego));

  // Actualizar el contenido del modal
  document.getElementById("victoriasJugador1").textContent = estadisticasJuego.victoriasJugador1;

  document.getElementById("victoriasJugador2").textContent = estadisticasJuego.victoriasJugador2;

  document.getElementById("empates").textContent = estadisticasJuego.empates;
}

//Const obtiene modo de juego
const modoJuego = localStorage.getItem("modoJuego");

const btnReiniciar = document.getElementById("btnReiniciar")
const mensajeGanador = document.getElementById("mensajeGanador")
const mensajeTurnoJugador = document.getElementById("mensajeTurnoJugador")

const celdas = document.getElementsByClassName("celda");

//Constantes para el modal que solicita nombre y ficha de juego al usuario 
const modalJugadores = document.getElementById("modalJugadores")
const btnComenzar = document.getElementById("btnComenzar")
const btnFicha = document.getElementsByClassName("btnFicha")

let turno = true;

let juegoActivo = true;

let tablero = ["","","","","","","","",""];

let fichaJugador1 = null;
let fichaJugador2 = null;

//Lista de combinaciones posibles para ganar
const combinacionesGanadoras = [
    [0, 1, 2], //h
    [3, 4, 5], //h
    [6, 7, 8], //h
    [0, 3, 6], //v
    [1, 4, 7], //v
    [2, 5, 8], //v
    [0, 4, 8], //d
    [2, 4, 6] //d
]

//Función para mostrar en pantalla el turno de cada jugador
actualizarMensajeTurno()
function actualizarMensajeTurno() {
    if (turno === true) {
        mensajeTurnoJugador.textContent = "JUGADOR 1"
    }else{
        if(modoJuego === "dosJugadores"){
            mensajeTurnoJugador.textContent = "JUGADOR 2"
        }else{
             mensajeTurnoJugador.textContent = "COMPUTADORA"
        }
    }
}

//Función para verificar ganador
verificarGanador()
function verificarGanador() {
    for (let index = 0; index < combinacionesGanadoras.length; index++) {
      const [a, b, c,]  = combinacionesGanadoras[index]


      //verifica si las casillas son iguales 
      if (
        celdas[a].textContent !== "" &&
        celdas[a].textContent === celdas[b].textContent &&
        celdas[a].textContent === celdas[c].textContent
        ){
            celdas[a].classList.add("ganador")
            celdas[b].classList.add("ganador")
            celdas[c].classList.add("ganador")

            return celdas[a].textContent;
        }
    }
    return null
}

//Función para verificar si hay empate
function verificarEmpate() {
    for (let index = 0; index < tablero.length; index++) {
       if (tablero[index] === "") {
        return false;
       }  
    }
    return true;
}

//
for (let index = 0; index < celdas.length; index++) {
    const element = celdas[index];
    console.log(index);

    celdas[index].addEventListener("click", function() {
        if (!juegoActivo) return;

        if (element.textContent === "") {
            let jugadorActual;

            if (turno) {
                jugadorActual = "X"

            } else{
                jugadorActual = "O"
            }

            element.textContent = jugadorActual;

            tablero[index] = jugadorActual;

            const ganador = verificarGanador();
            if (ganador) {
                mensajeGanador.textContent = "! FELICIDADES JUGADOR " + ganador +" !";
                juegoActivo = false;
                return;
            }

            if(verificarEmpate()){
                mensajeGanador.textContent = "¡EMPATE!";
                juegoActivo = false;
                return;
            }

            turno = !turno;

            actualizarMensajeTurno()

            if (!turno && modoJuego ==="unJugador" ) {
                setTimeout(movComputadora,1000);
            }
        }
    });
}


//Botón reinicia el tablero del juego
btnReiniciar.addEventListener("click", function () {
    for (let index = 0; index < celdas.length; index++) {
        celdas[index].textContent = "";
        celdas[index].classList.remove("ganador");
    }

    mensajeGanador.textContent = "";
    turno = true
    tablero = ["", "","","","","","","",""];
    actualizarMensajeTurno()
})

/////////////////////////////////
//Función para jugar contra la computadora
function movComputadora (){
    let celdasDisponibles = [];
    
    for (let index = 0; index < tablero.length; index++) {
        if (tablero[index] === "") {
            celdasDisponibles.push(index);
        }
    }

    if (!celdasDisponibles.length) {
        return;
    }

    let aleatorio = Math.floor(Math.random() * celdasDisponibles.length);
    let eleccion = celdasDisponibles[aleatorio]

    celdas[eleccion].textContent = "O";
    tablero[eleccion] = "O";

    const ganador = verificarGanador();
            if (ganador) {
                mensajeGanador.textContent = "! FELICIDADES JUGADOR " + ganador +" !";
                juegoActivo = false;
                return;
            }

            if(verificarEmpate()){
                mensajeGanador.textContent = "¡EMPATE!";
                juegoActivo = false;
                return;
            }

            turno = !turno;

            actualizarMensajeTurno()
}

//////////////////////////////////////////77
/*MODAL VENTANA EMERGENTE PARA DOS JUGADORES*/ 
// Mostrar u ocultar modal al inicio
if (modoJuego === "dosJugadores") {
    modalJugadores.style.display = "flex";
} else {
    modalJugadores.style.display = "none";
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


const nombreJugador1 = document.getElementById("nombreJugador1");
const nombreJugador2 = document.getElementById("nombreJugador2");

btnComenzar.addEventListener("click", function () {
    // Validar que los nombres estén escritos y que haya eligido la ficha
    if (nombreJugador1.value.trim() === "" || nombreJugador2.value.trim() === "") {
        alert("Por favor, escribe los nombres de ambos jugadores.");
        return;
    }

    if (!fichaJugador1 || !fichaJugador2) {
        alert("Por favor, selecciona las fichas de ambos jugadores.");
        return;
    }

    localStorage.setItem("nombreJugador1", nombreJugador1.value);
    localStorage.setItem("nombreJugador2", nombreJugador2.value);
    localStorage.setItem("fichaJugador1", fichaJugador1);
    localStorage.setItem("fichaJugador2", fichaJugador2);

    // Ocultar modal
    modalJugadores.style.display = "none";
});


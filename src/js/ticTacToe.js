const btnReiniciar = document.getElementById("btnReiniciar")
const mensajeGanador = document.getElementById("mensajeGanador")
const mensajeTurnoJugador = document.getElementById("mensajeTurnoJugador")

const celdas = document.getElementsByClassName("celda");

let turno = true

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
    if (turno) {
        mensajeTurnoJugador.textContent = "JUGADOR 1"
    }else{
        mensajeTurnoJugador.textContent = "JUGADOR 2"
    }
}

//Función para verificar ganador
function verificarGanador() {
    for (let index = 0; index < combinacionesGanadoras.length; index++) {
      const [a, b, c,]  = combinacionesGanadoras[index]

      if (
        celdas[a].textContent !== "" &&
        celdas[a].textContent === celdas[b].textContent &&
        celdas[a].textContent === celdas[c].textContent
        ){
            return celdas[a].textContent;
        }
    }
}


//
for (let index = 0; index < celdas.length; index++) {
    const element = celdas[index];
    console.log(index);

    celdas[index].addEventListener("click", function() {
        if (element.textContent === "") {
            let jugadorActual;

            if (turno) {
                jugadorActual = "X"

            } else{
                jugadorActual = "O"
            }

            element.textContent = jugadorActual;

            const ganador = verificarGanador();
            if (ganador) {
                mensajeGanador.textContent = "GANO EL JUGADOR",ganador
                return;
            }
            turno = !turno;

            actualizarMensajeTurno()
        }
    })
}


//Botón reinicia el tablero del juego
btnReiniciar.addEventListener("click", function () {
    for (let index = 0; index < celdas.length; index++) {
        celdas[index].textContent = "";
    }

    mensajeGanador.textContent = ""
    turno = true
    actualizarMensajeTurno()
})
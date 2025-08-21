const btnReiniciar = document.getElementById("btnReiniciar")
const mensajeGanador = document.getElementById("mensajeGanador")
const mensajeTurnoJugador = document.getElementById("mensajeTurnoJugador")


const modoJuego = localStorage.getItem("modoJuego");

const celdas = document.getElementsByClassName("celda");

let turno = true;

let tablero = ["", "","","","","","","",""];
/* let jugadasDisponibles = []; */

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
                return;
            }

            if(verificarEmpate()){
                mensajeGanador.textContent = "¡EMPATE!";
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
}
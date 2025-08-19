const celdas = document.getElementsByClassName("celda");

let turno = true

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

            turno = !turno;
        }
    })
}

const btnReiniciar = document.getElementById("btnReiniciar")
const mensajeGanador = document.getElementById("mensajeGanador")

btnReiniciar.addEventListener("click", function () {
    for (let index = 0; index < celdas.length; index++) {
        celdas[index].textContent = "";
        
    }

    mensajeGanador.textContent = ""
    turno = true
})
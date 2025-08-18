
const btnComenzar = document.getElementById("btnComenzar")
const rdUnJugador = document.getElementById("rdUnJugador")
const rdDosJugadores = document.getElementById("rdDosJugadorres")

btnComenzar.addEventListener("click", function() {
    if (rdUnJugador.checked || rdDosJugadores.checked) {
        alert("¡COMIENZA!")
    }else{
        alert("Debe serleccionar un modo de juego")
    }
});
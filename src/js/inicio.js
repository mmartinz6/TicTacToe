
const btnComenzar = document.getElementById("btnComenzar")
const rdUnJugador = document.getElementById("rdUnJugador")
const rdDosJugadores = document.getElementById("rdDosJugadores")
const audioClick = document.getElementById("audioClick")

btnComenzar.addEventListener("click", function() {
    //Reproduce audio al hacer click en el boton comenzar
    audioClick.currentTime = 0; //Se reinicia el audio
    audioClick.play();//Reproduce el audio al hacer click

    if (rdUnJugador.checked) {
        localStorage.setItem("modoJuego", "unJugador");
    }else
        if(rdDosJugadores.checked){
        localStorage.setItem("modoJuego", "dosJugadores");
    }else{
        alert("SELECCIONE UN MODO DE JUEGO")
        return;
    }

    window.location.href = "ticTacToe.html"
});
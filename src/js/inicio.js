
const btnComenzar = document.getElementById("btnComenzar")
const rdUnJugador = document.getElementById("rdUnJugador")
const rdDosJugadores = document.getElementById("rdDosJugadorres")
const audioClick = document.getElementById("audioClick")

btnComenzar.addEventListener("click", function() {
    //Reproduce audio al hacer click en el boton comenzar
    audioClick.currentTime = 0; //Se reinicia el audio
    audioClick.play();//Reproduce el audio al hacer click


});
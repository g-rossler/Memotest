
let $tablero = document.querySelector(".container")
let seleccionCuadro1;
let seleccionCuadro2;
let contador = 0
let contadorPares = 0
asignarColores()
habilitarUsuario($tablero) 
let resultado = document.querySelector(".resultado")
let parrafo = document.querySelector(".parrafo")


function asignarColores() {
    let arrayColores = ["black", "black", "blue", "blue", "saddlebrown", "saddlebrown", "violet", "violet", "gold", "gold", "green", "green"]
    let cuadros = document.querySelectorAll(".cuadro")
    
    cuadros.forEach(function(cuadro, index) {
        let indexMas = index + 1
        let arrayNumero = arrayColores.length
        let numeroRandom = numerosRandom(arrayNumero)
        cuadro.style[`background-color`] = arrayColores[numeroRandom]
        
        arrayColores.splice(numeroRandom, 1)
    })
}

function numerosRandom(numero) {
    let numeroAlteratorio = Math.floor(Math.random() * numero)
    return numeroAlteratorio
}

function habilitarUsuario($tablero) {
    $tablero.onclick = function(e) {
        const $elemento = e.target
        if($elemento.classList.contains("cuadro")) {
            asignarCuadro($elemento)
        }
    }

}

document.querySelector(".reiniciar").onclick = reiniciar

function asignarCuadro(e) {
    
    if(seleccionCuadro1 === undefined) {
        seleccionCuadro1 = e
        mostrarCuadro(seleccionCuadro1)
    } else if(seleccionCuadro1 != e) {
        seleccionCuadro2 = e
        mostrarCuadro(seleccionCuadro2)
        compararCuadro()
    } else {
        ocultarCuadro(seleccionCuadro1)
        seleccionCuadro1 = undefined
    }
    
    
        
}

function compararCuadro() {
    if(seleccionCuadro1 && seleccionCuadro2) {
        
            if(seleccionCuadro1.style[`background-color`] === seleccionCuadro2.style[`background-color`]) {

                seleccionCuadro1.parentElement.style.backgroundColor = seleccionCuadro1.style[`background-color`]
                seleccionCuadro2.parentElement.style.backgroundColor = seleccionCuadro2.style[`background-color`]


                
                seleccionCuadro1 = undefined
                seleccionCuadro2 = undefined
                
                contadorPares++
                contador++

                if(contadorPares === 6){
                    document.querySelector(".container").style.display = "none"
                    
                    resultado.style.display = "block"
                    parrafo.textContent = `Finalizaste el juego en ${contador} turnos!!!`
                    document.querySelector(".reiniciar").style.display = "block"


                }
            } else {
                ocultarCuadro(seleccionCuadro1)
                ocultarCuadro(seleccionCuadro2)

                seleccionCuadro1 = undefined
                seleccionCuadro2 = undefined
                
                contador++
            } 
        }
}

function reiniciar() {
    ocultarResultado()
    reiniciarCuadros()

}

function reiniciarCuadros() {
    document.querySelectorAll(".cuadro").forEach(function($cuadro) {
        reinciarCuadro($cuadro)
    })
    
    asignarColores()
    contador = 0
    contadorPares = 0
}

function reinciarCuadro(cuadro) {
    
    cuadro.style.opacity = 0
    cuadro.parentElement.style[`background-color`] = "white"
}

function ocultarResultado() {
    document.querySelector(".container").style.display = ""
    resultado.style.display = "none"
    parrafo.textContent = ""
    document.querySelector(".reiniciar").style.display = "none"
}

function mostrarCuadro(cuadro) {
    cuadro.style.opacity = 1
}

function ocultarCuadro(cuadro) {
    setTimeout(function() {
        cuadro.style.opacity = 0
    },500)
    
}


/* 



Agregar una pagina de inicio para seleccionar la dificultad.
*/
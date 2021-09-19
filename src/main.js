
let $tablero = document.querySelector(".container")
let seleccionCuadro1;
let seleccionCuadro2;
let contador = 0
let contadorPares = 0
asignarColores()
habilitarUsuario($tablero) 
let resultado = document.querySelector(".resultado")


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
    } else {
        ocultarCuadro(seleccionCuadro1)
        seleccionCuadro1 = undefined
    }
    
    
        
}

function compararCuadro() {
    if(seleccionCuadro1 && seleccionCuadro2) {
        
            if(seleccionCuadro1.style[`background-color`] === seleccionCuadro2.style[`background-color`]) {

                seleccionCuadro1.style.visibility = "hidden"
                seleccionCuadro2.style.visibility = "hidden"
                
                let elementoPadreSeleccionCuadro1 = seleccionCuadro1.parentElement
                let elementoPadreSeleccionCuadro2 = seleccionCuadro2.parentElement
                elementoPadreSeleccionCuadro1.style.backgroundColor = objetos[seleccionCuadro1.id].color
                elementoPadreSeleccionCuadro2.style.backgroundColor = objetos[seleccionCuadro2.id].color

                seleccionCuadro1.remove()
                seleccionCuadro2.remove()

                eliminarBordesCuadrado(seleccionCuadro1)
                eliminarBordesCuadrado(seleccionCuadro2)
                
                seleccionCuadro1 = undefined
                seleccionCuadro2 = undefined
                
                contadorPares++
                contador++

                if(contadorPares === 6){
                    document.querySelector(".container").style.display = "none"
                    
                    resultado.style.visibility = "visible"
                    resultado.textContent = `Finalizaste el juego en ${contador} turnos!!!`
                    document.querySelector(".reiniciar").style.visibility = "visible"

                }
            } else {
                ocultarCuadro(seleccionCuadro1)
                ocultarCuadro(seleccionCuadro2)
                eliminarBordesCuadrado(seleccionCuadro1)
                eliminarBordesCuadrado(seleccionCuadro2)

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
    cuadro.style.visibility = "visible"
    let elementoPadreCuadro = cuadro.parentElement
    elementoPadreCuadro.style.backgroundColor = ""
}

function ocultarResultado() {
    document.querySelector(".container").style.visibility = "visible"
    resultado.style.visibility = "hidden"
    document.querySelector(".reiniciar").style.visibility = "hidden"
}

function agregarBordesCuadrado(cuadro) {
    cuadro.style.border = "1px solid"
    cuadro.style[`border-color`] = "white"
}

function eliminarBordesCuadrado(cuadro) {
    cuadro.style.border = ""
    cuadro.style[`border-color`] = ""
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
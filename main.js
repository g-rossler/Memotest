let objetos = {
    cuadrado1 : {
    },
    cuadrado2 : {
    },
    cuadrado3 : {
    },
    cuadrado4 : {
    },
    cuadrado5 : {
    },
    cuadrado6 : {
    },
    cuadrado7 : {
    },
    cuadrado8 : { 
    },
    cuadrado9 : {   
    },
    cuadrado10 : {    
    },
    cuadrado11 : {      
    },
    cuadrado12 : {  
    }
}


let seleccionCuadro1;
let seleccionCuadro2;
let contador = 0
let contadorPares = 0
asignarColores()
habilitarUsuario() 
let resultado = document.querySelector(".resultado")


function asignarColores() {
    let arrayColores = ["black", "black", "blue", "blue", "saddlebrown", "saddlebrown", "violet", "violet", "gold", "gold", "green", "green"]
    let cuadros = document.querySelectorAll(".cuadro")
    
    cuadros.forEach(function(cuadro, index) {
        let indexMas = index + 1
        let arrayNumero = arrayColores.length
        let numeroRandom = numerosRandom(arrayNumero)
        cuadro.style[`background-color`] = arrayColores[numeroRandom]
        objetos[`cuadrado` + [indexMas]]["color"] = arrayColores[numeroRandom]
        arrayColores.splice(numeroRandom, 1)
    })
}

function numerosRandom(numero) {
    let numeroAlteratorio = Math.floor(Math.random() * numero)
    return numeroAlteratorio
}

function habilitarUsuario() {
    document.querySelectorAll(".cuadro").forEach(function($cuadro) {
        $cuadro.onclick = compararCuadro
    })
}

document.querySelector(".reiniciar").onclick = reiniciar

function compararCuadro(e) {
    
    if(seleccionCuadro1 === undefined) {
        seleccionCuadro1 = e.target
        agregarBordesCuadrado(seleccionCuadro1)
        mostrarCuadro(seleccionCuadro1)
    } else if(seleccionCuadro1 != e.target) {
        seleccionCuadro2 = e.target
        agregarBordesCuadrado(seleccionCuadro2)
        mostrarCuadro(seleccionCuadro2)
    } else {
        eliminarBordesCuadrado(seleccionCuadro1)
        ocultarCuadro(seleccionCuadro1)
        seleccionCuadro1 = undefined
    }
    
    if(seleccionCuadro1 && seleccionCuadro2) {
        setTimeout(function () {
            if(objetos[seleccionCuadro1.id].color === objetos[seleccionCuadro2.id].color) {

                seleccionCuadro1.style.visibility = "hidden"
                seleccionCuadro2.style.visibility = "hidden"
                
                let elementoPadreSeleccionCuadro1 = seleccionCuadro1.parentElement
                let elementoPadreSeleccionCuadro2 = seleccionCuadro2.parentElement
                elementoPadreSeleccionCuadro1.style.backgroundColor = objetos[seleccionCuadro1.id].color
                elementoPadreSeleccionCuadro2.style.backgroundColor = objetos[seleccionCuadro2.id].color



                ocultarCuadro(seleccionCuadro1)
                ocultarCuadro(seleccionCuadro2)
                eliminarBordesCuadrado(seleccionCuadro1)
                eliminarBordesCuadrado(seleccionCuadro2)
                
                seleccionCuadro1 = undefined
                seleccionCuadro2 = undefined
                
                contadorPares++
                contador++

                if(contadorPares === 6){
                    document.querySelector(".container").style.visibility = "hidden"
                    
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
        },750)}
        
        
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
    cuadro.style.opacity = 0
}

/* 



Agregar una pagina de inicio para seleccionar la dificultad.
*/
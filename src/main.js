let $tablero = document.querySelector(".container")
let seleccionCuadro1;
let seleccionCuadro2;
let contador = 0
let contadorPares = 0
let resultado = document.querySelector("#resultado")
let parrafo = document.querySelector(".parrafo")



function cuadrosDeFondo() {
    let cuadro1 = document.querySelector("#cuadroDeFondo1")
    setInterval(function() {
        cuadro1.style.opacity = cuadro1.style.opacity === "1" ? 0 : 1;
    } , 1300)
            


    for(let i = 0; i < 100; i++) {
        setTimeout(function() {
            if(document.querySelector("#cuadroDeFondo2").style.opacity === "1") {
                document.querySelector("#cuadroDeFondo2").style.opacity = 0
            } else {
                document.querySelector("#cuadroDeFondo2").style.opacity = 1
            }
        }, i * 1500)
    }

    for(let i = 0; i < 100; i++) {
        setTimeout(function() {
            if(document.querySelector("#cuadroDeFondo3").style.opacity === "1") {
                document.querySelector("#cuadroDeFondo3").style.opacity = 0
            } else {
                document.querySelector("#cuadroDeFondo3").style.opacity = 1
            }
        }, i * 1600)        
    }

    for(let i = 0; i < 100; i++) {
        setTimeout(function() {
            if(document.querySelector("#cuadroDeFondo4").style.opacity === "1") {
                document.querySelector("#cuadroDeFondo4").style.opacity = 0
            } else {
                document.querySelector("#cuadroDeFondo4").style.opacity = 1
            }
        }, i * 1400)        
    }

}

function seleccionDeDificultad() {
    let juegoFacil = document.querySelector("#button1")
    let juegoMedio = document.querySelector("#button2")
    let juegoDificil = document.querySelector("#button3")

    juegoFacil.onclick = inicioDelJuego 
    juegoMedio.onclick = inicioDelJuego
    juegoDificil.onclick = inicioDelJuego
}

function inicioDelJuego(e) {
    let objetivo = e.target
    if(objetivo.innerText === "FACIL") {
        ocultarInicio()
        crearCuadros(2)
    } else if(objetivo.innerText === "MEDIO") {
        ocultarInicio()
        crearCuadros(4)
    } else if(objetivo.innerText === "DIFICIL") {
        ocultarInicio()
        crearCuadros(6)  
    }
}

function crearCuadros(cantidad) {
    if(cantidad === 2) {
        crearFilas(2)
        asignarColores(2)
    } else if(cantidad === 4) {
        crearFilas(4)
        asignarColores(4)
    } else {
        crearFilas(6)
        asignarColores(6)
    }
}

function crearFilas(cantidad) {
    let contadorCuadros = 1
    for(let i = 0; i < cantidad; i++) {
        let $fila = document.createElement("div")
        $fila.className = "row fila"
        for(let j = 0; j < 3; j++) {
            let $div = document.createElement("div")
            $div.className = "cuadro"
            $div.id = `cuadro${contadorCuadros}`
            contadorCuadros++
            let $col = document.createElement("div")
            $col.className = "col borde"
            $col.appendChild($div)
            $fila.appendChild($col)
        }
        if(cantidad === 2) {
            $fila.style.height = "50vh"
        } else if(cantidad === 4) {
            $fila.style.height = "25vh"
        } else {
            $fila.style.height = "16.60vh"
        }
        document.querySelector(".container").appendChild($fila)
    }
}

function ocultarInicio() {
    document.querySelector(".inicio").style.display = "none"
    document.querySelector("#tabla").style.display = "block"
}

function asignarColores(cantidad) {
    let arrayColores;
    if(cantidad === 2) {
        arrayColores = ["black", "black", "blue", "blue", "saddlebrown", "saddlebrown"]
    } else if(cantidad === 4) {
        arrayColores = ["black", "black", "blue", "blue", "saddlebrown", "saddlebrown", "violet", "violet", "gold", "gold", "green", "green"]
    } else {
        arrayColores = ["black", "black", "blue", "blue", "saddlebrown", "saddlebrown", "violet", "violet", "gold", "gold", "green", "green", "teal", "teal", "yellowgreen", "yellowgreen", "tomato", "tomato"]
    }
    
    let cuadros = document.querySelectorAll(".cuadro")
    
    cuadros.forEach(function(cuadro) {
        
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
                let cantidadDePares;
                let cantidadDeFilas = document.querySelectorAll(".row").length
                if(cantidadDeFilas === 2) {
                    cantidadDePares = 3
                } else if(cantidadDeFilas === 4) {
                    cantidadDePares = 6
                } else {
                    cantidadDePares = 9
                }

                if(contadorPares === cantidadDePares){
                    document.querySelector("#tabla").style.display = "none"
                    resultado.style.display = "block"
                    parrafo.textContent = `Finalizaste el juego en ${contador} turnos!!!`
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
    cuadrosDeFondo()
}

function reiniciarCuadros() {
    document.querySelectorAll(".row").forEach(function($fila) {
        $fila.remove()
    })
    
    contador = 0
    contadorPares = 0
}



function ocultarResultado() {
    document.querySelector("#tabla").style.display = "block"
    reiniciarCuadros()
    document.querySelector("#tabla").style.display = "none"
    document.querySelector(".inicio").style.display = "flex"
    resultado.style.display = "none"
    parrafo.textContent = ""
}

function mostrarCuadro(cuadro) {
    cuadro.style.opacity = 1
}

function ocultarCuadro(cuadro) {
    setTimeout(function() {
        cuadro.style.opacity = 0
    },500)
}

document.querySelector(".reiniciar").onclick = reiniciar


habilitarUsuario($tablero) 

cuadrosDeFondo()
seleccionDeDificultad()



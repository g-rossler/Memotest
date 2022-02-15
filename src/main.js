let $tablero = document.querySelector(".container")
let seleccionCuadro1;
let seleccionCuadro2;
let contador = 0
let contadorPares = 0
let resultado = document.querySelector("#resultado")
let parrafo = document.querySelector(".parrafo")



function cuadrosDeFondo() {
    let cuadro1 = document.querySelector("#cuadroDeFondo1")
    let cuadro2 = document.querySelector("#cuadroDeFondo2")
    let cuadro3 = document.querySelector("#cuadroDeFondo3")
    let cuadro4 = document.querySelector("#cuadroDeFondo4")

    setInterval(function() {
        cuadro1.style.opacity = cuadro1.style.opacity === "1" ? 0.2 : 1;
    } , 1000)
    
    setInterval(function() {
        cuadro2.style.opacity = cuadro2.style.opacity === "1" ? 0.2 : 1;
    } , 920)

    setInterval(function() {
        cuadro3.style.opacity = cuadro3.style.opacity === "1" ? 0.2 : 1;
    } , 950)

    setInterval(function() {
        cuadro4.style.opacity = cuadro4.style.opacity === "1" ? 0.2 : 1;
    } , 980)

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
    if(objetivo.innerText === "FÁCIL") {
        ocultarInicio()
        crearTabla(6)
    } else if(objetivo.innerText === "MEDIO") {
        ocultarInicio()
        crearTabla(12)
    } else if(objetivo.innerText === "DIFÍCIL") {
        ocultarInicio()
        crearTabla(18)  
    }
}

function crearTabla(cantidad) {
    if(cantidad === 6) {
        crearCuadro(6)
        asignarColores(6)
    } else if(cantidad === 12) {
        crearCuadro(12)
        asignarColores(12)
    } else {
        crearCuadro(18)
        asignarColores(18)
    }
}

function crearCuadro(cantidad) {

    for(let i = 0; i < cantidad; i++) {
        let $cuadro = document.createElement("div")
        $cuadro.className = "cuadro"
        $cuadro.id = `cuadro${i}`
        let $bordeCuadro = document.createElement("div")
        $bordeCuadro.className = "borde-cuadro"
        $bordeCuadro.appendChild($cuadro)
        document.querySelector(".container").appendChild($bordeCuadro)
    }
}


function ocultarInicio() {
    document.querySelector(".inicio").style.display = "none"
    document.querySelector("#juego").style.display = "block"
    document.querySelector("#tabla").style.display = "grid"
}

function asignarColores(cantidad) {
    let arrayColores;
    if(cantidad === 6) {
        arrayColores = ["#390099", "#390099", "#9E0059", "#9E0059", "#FF0054", "#FF0054"]
    } else if(cantidad === 12) {
        arrayColores = ["#390099", "#390099", "#9E0059", "#9E0059", "#FF0054", "#FF0054", "#FF5400", "#FF5400", "#FFBD00", "#FFBD00", "#020887", "#020887"]
    } else {
        arrayColores = ["#390099", "#390099", "#9E0059", "#9E0059", "#FF0054", "#FF0054", "#FF5400", "#FF5400", "#FFBD00", "#FFBD00", "#020887", "#020887", "#334195", "#334195", "#647AA3", "#647AA3", "#C6EBBE", "#C6EBBE"]
    }
    
    let cuadros = document.querySelectorAll(".cuadro")
    
    cuadros.forEach(function(cuadro) {
        
        let numeroRandom = numerosRandom(arrayColores.length)
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
                let cantidadDeCuadros = document.querySelectorAll(".cuadro").length
                if(cantidadDeCuadros === 6) {
                    cantidadDePares = 3
                } else if(cantidadDeCuadros === 12) {
                    cantidadDePares = 6
                } else {
                    cantidadDePares = 9
                }

                if(contadorPares === cantidadDePares){
                    document.querySelector("#juego").style.display = "none"
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
    
}

function reiniciarCuadros() {
    document.querySelectorAll(".borde-cuadro").forEach(function($cuadro) {
        $cuadro.remove()
    })
    contador = 0
    contadorPares = 0
}



function ocultarResultado() {
    reiniciarCuadros()
    document.querySelector("#juego").style.display = "none"
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



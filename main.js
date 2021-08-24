let objetos = {
    cuadrado1 : {
        foundMatch : false
    },
    cuadrado2 : {
        foundMatch : false
    },
    cuadrado3 : {
        foundMatch : false
    },
    cuadrado4 : {
        foundMatch : false
    },
    cuadrado5 : {
        foundMatch : false
    },
    cuadrado6 : { 
        foundMatch : false
    },
    cuadrado7 : {
        foundMatch : false
    },
    cuadrado8 : { 
        foundMatch : false
    },
    cuadrado9 : {   
        foundMatch : false
    },
    cuadrado10 : {   
        foundMatch : false
    },
    cuadrado11 : {      
        foundMatch : false
    },
    cuadrado12 : {
        foundMatch : false
    }
}


let seleccionCuadro1;
let seleccionCuadro2;
asignarColores()
habilitarUsuario() 



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

function compararCuadro(e) {
    
    if(seleccionCuadro1 === undefined) {
        seleccionCuadro1 = e.target
        agregarBordesCuadrado(seleccionCuadro1)
    } else {
        seleccionCuadro2 = e.target
        agregarBordesCuadrado(seleccionCuadro2)
    }

    if(seleccionCuadro1 && seleccionCuadro2) {
        if(objetos[seleccionCuadro1.id].color === objetos[seleccionCuadro2.id].color) {
            seleccionCuadro1.style.visibility = "hidden"
            seleccionCuadro2.style.visibility = "hidden"
            eliminarBordesCuadrado(seleccionCuadro1)
            eliminarBordesCuadrado(seleccionCuadro2)
            seleccionCuadro1 = undefined
            seleccionCuadro2 = undefined

        } else {
            eliminarBordesCuadrado(seleccionCuadro1)
            eliminarBordesCuadrado(seleccionCuadro2)
            seleccionCuadro1 = undefined
            seleccionCuadro2 = undefined

        }
    }
}


function agregarBordesCuadrado(cuadro) {
    cuadro.style.border = "1px solid"
    cuadro.style[`border-color`] = "white"
}

function eliminarBordesCuadrado(cuadro) {
    cuadro.style.border = ""
    cuadro.style[`border-color`] = ""
}

const $tablero = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const parrafo = document.querySelector('.parrafo');
let seleccionCuadro1;
let seleccionCuadro2;
let contador = 0;
let contadorPares = 0;

function ocultarInicio() {
  document.querySelector('.inicio').style.display = 'none';
  document.querySelector('#juego').style.display = 'block';
  document.querySelector('#tabla').style.display = 'grid';
}

function numerosRandom(numero) {
  const numeroAlteratorio = Math.floor(Math.random() * numero);
  return numeroAlteratorio;
}

function asignarColores(cantidad) {
  let arrayColores;
  if (cantidad === 6) {
    arrayColores = ['#390099', '#390099', '#9E0059', '#9E0059', '#FF0054', '#FF0054'];
  } else if (cantidad === 12) {
    arrayColores = ['#390099', '#390099', '#9E0059', '#9E0059', '#FF0054', '#FF0054', '#FF5400', '#FF5400', '#FFBD00', '#FFBD00', '#020887', '#020887'];
  } else {
    arrayColores = ['#390099', '#390099', '#9E0059', '#9E0059', '#FF0054', '#FF0054', '#FF5400', '#FF5400', '#FFBD00', '#FFBD00', '#020887', '#020887', '#334195', '#334195', '#647AA3', '#647AA3', '#C6EBBE', '#C6EBBE'];
  }

  const cuadros = document.querySelectorAll('.cuadro');

  cuadros.forEach((elem) => {
    const cuadro = elem;
    const numeroRandom = numerosRandom(arrayColores.length);
    cuadro.style['background-color'] = arrayColores[numeroRandom];

    arrayColores.splice(numeroRandom, 1);
  });
}

function crearCuadro(cantidad) {
  for (let i = 0; i < cantidad; i += 1) {
    const $cuadro = document.createElement('div');
    $cuadro.className = 'cuadro';
    $cuadro.id = `cuadro${i}`;
    const $bordeCuadro = document.createElement('div');
    $bordeCuadro.className = 'borde-cuadro';
    $bordeCuadro.appendChild($cuadro);
    document.querySelector('.container').appendChild($bordeCuadro);
  }
}

function crearTabla(cantidad) {
  if (cantidad === 6) {
    crearCuadro(6);
    asignarColores(6);
  } else if (cantidad === 12) {
    crearCuadro(12);
    asignarColores(12);
  } else {
    crearCuadro(18);
    asignarColores(18);
  }
}

function inicioDelJuego(e) {
  const objetivo = e.target;
  if (objetivo.innerText === 'FÁCIL') {
    ocultarInicio();
    crearTabla(6);
  } else if (objetivo.innerText === 'MEDIO') {
    ocultarInicio();
    crearTabla(12);
  } else if (objetivo.innerText === 'DIFÍCIL') {
    ocultarInicio();
    crearTabla(18);
  }
}

function seleccionDeDificultad() {
  const juegoFacil = document.querySelector('#button1');
  const juegoMedio = document.querySelector('#button2');
  const juegoDificil = document.querySelector('#button3');

  juegoFacil.onclick = inicioDelJuego;
  juegoMedio.onclick = inicioDelJuego;
  juegoDificil.onclick = inicioDelJuego;
}

function habilitarUsuario(elemento) {
  const tablero = elemento;
  tablero.onclick = function habilitarClick(e) {
    const $elemento = e.target;
    if ($elemento.classList.contains('cuadro')) {
      asignarCuadro($elemento);
    }
  };
}

function mostrarCuadro(elemento) {
  const cuadro = elemento;
  cuadro.style.opacity = 1;
}

function ocultarCuadro(elemento) {
  const cuadro = elemento;
  setTimeout(() => {
    cuadro.style.opacity = 0;
  }, 500);
}

function compararCuadro() {
  if (seleccionCuadro1 && seleccionCuadro2) {
    if (seleccionCuadro1.style['background-color'] === seleccionCuadro2.style['background-color']) {
      seleccionCuadro1.parentElement.style.backgroundColor = seleccionCuadro1.style['background-color'];
      seleccionCuadro2.parentElement.style.backgroundColor = seleccionCuadro2.style['background-color'];

      seleccionCuadro1 = undefined;
      seleccionCuadro2 = undefined;

      contadorPares += 1;
      contador += 1;
      let cantidadDePares;
      const cantidadDeCuadros = document.querySelectorAll('.cuadro').length;
      if (cantidadDeCuadros === 6) {
        cantidadDePares = 3;
      } else if (cantidadDeCuadros === 12) {
        cantidadDePares = 6;
      } else {
        cantidadDePares = 9;
      }

      if (contadorPares === cantidadDePares) {
        document.querySelector('#juego').style.display = 'none';
        resultado.style.display = 'block';
        parrafo.textContent = `Finalizaste el juego en ${contador} turnos!`;
      }
    } else {
      ocultarCuadro(seleccionCuadro1);
      ocultarCuadro(seleccionCuadro2);

      seleccionCuadro1 = undefined;
      seleccionCuadro2 = undefined;

      contador += 1;
    }
  }
}

function asignarCuadro(e) {
  if (seleccionCuadro1 === undefined) {
    seleccionCuadro1 = e;
    mostrarCuadro(seleccionCuadro1);
  } else if (seleccionCuadro1 !== e) {
    seleccionCuadro2 = e;
    mostrarCuadro(seleccionCuadro2);
    compararCuadro();
  } else {
    ocultarCuadro(seleccionCuadro1);
    seleccionCuadro1 = undefined;
  }
}

function reiniciarCuadros() {
  document.querySelectorAll('.borde-cuadro').forEach(($cuadro) => {
    $cuadro.remove();
  });
  contador = 0;
  contadorPares = 0;
}

function ocultarResultado() {
  reiniciarCuadros();
  document.querySelector('#juego').style.display = 'none';
  document.querySelector('.inicio').style.display = 'flex';
  resultado.style.display = 'none';
  parrafo.textContent = '';
}

function reiniciar() {
  ocultarResultado();
}

document.querySelector('.reiniciar').onclick = reiniciar;

habilitarUsuario($tablero);
seleccionDeDificultad();

import '../scss/style.scss'
import * as bootstrap from 'bootstrap'

import { obtenerDatos } from './api/datos.js'
import { Pelicula } from './componentes/Pelicula';

const Vistas = {
  LISTA_PELICULAS: 'lista-peliculas',
  FAVORITAS: 'favoritas',
}

let listaPeliculas = undefined;
let vistaActual = Vistas.LISTA_PELICULAS;

/**
 * Cambia el valor esFavorito de una película en el arreglo listaPeliculas.
 * @param {number} index 
 * @param {boolean} esFavorito 
 */
const cambiarFavorito = (index, esFavorito) => {
  listaPeliculas[index].esFavorito = esFavorito;
  if (vistaActual === Vistas.LISTA_PELICULAS) {
    generarListaPeliculas(listaPeliculas);
  } else {
    generarListaPeliculas(listaPeliculas.filter(pelicula => pelicula.esFavorito));
  }
}

/**
 * Elimina todos los elementos hijos de un nodo HTML que se pase como parámetro.
 * @param {Node} el 
 */
const eliminarElementosHijos = (el) => {
  while (el.firstChild) {
    el.removeChild(el.lastChild);
  }
}

/**
 * Función de utilidad que genera la lista de películas.
 * @param {Array} peliculas 
 */
const generarListaPeliculas = (peliculas) => {
  const row = document.getElementsByClassName('row')[0];
  eliminarElementosHijos(row);
  for (const pelicula of peliculas) {
    const peliculaUI = new Pelicula(pelicula, cambiarFavorito);
    row.appendChild(peliculaUI.render());
  }
}

/**
 * Agrega eventos de click a los botones en la barra de navegación.
 */
document.getElementById('lista-peliculas').addEventListener('click', () => {
  vistaActual = Vistas.LISTA_PELICULAS;
  generarListaPeliculas(listaPeliculas);
});

document.getElementById('favoritas').addEventListener('click', () => {
  vistaActual = Vistas.FAVORITAS;
  generarListaPeliculas(listaPeliculas.filter(pelicula => pelicula.esFavorito));
});

/**
 * Carga los datos apenas la aplicación empieza.
 */
obtenerDatos().then(datosPeliculas => {
  listaPeliculas = datosPeliculas.map((pelicula, index) => ({ ...pelicula, index, esFavorito: false }));
  generarListaPeliculas(listaPeliculas);
});

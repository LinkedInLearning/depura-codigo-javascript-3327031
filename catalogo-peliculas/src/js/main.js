import '../scss/style.scss'
import * as bootstrap from 'bootstrap'

import { obtenerDatos } from './api/datos.js'
import Pelicula from './componentes/Pelicula';

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
  generarListaPeliculas(listaPeliculas);
}

/**
 * Función de utilidad que genera la lista de películas.
 * @param {Array} peliculas 
 */
const generarListaPeliculas = (peliculas) => {
  const row = document.getElementsByClassName('row')[0];
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
  generarListaPeliculas(listaPeliculas);
});

/**
 * Carga los datos apenas la aplicación empieza.
 */
obtenerDatos().then(datosPeliculas => {
  listaPeliculas = datosPeliculas.map((pelicula, index) => ({ ...pelicula, index, esFavorito: false }));
  generarListaPeliculas(listaPeliculas);
});

export class Pelicula {

  constructor(datosPelicula, cambiarFavorito) {
    Object.assign(this, datosPelicula);
    this.cambiarFavorito = cambiarFavorito;
  }

  render() {
    const col = document.createElement('div');
    col.innerHTML = `<div class="card" style="width: 100%; margin-top: 10px;">
  <div class="card-body">
    <h5 class="card-title">${this.titulo}</h5>
    <p class="card-text">${this.descripcion}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Idioma: ${this.idioma}</li>
    <li class="list-group-item">País: ${this.pais}</li>
    <li class="list-group-item">Año de Estreno: ${this.anio_estreno}</li>
    <li class="list-group-item">Clasificación: ${this.clasificacion}</li>
  </ul>
  <div class="card-body">
    <h5 class="card-title">Trama</h5>
    <p class="card-text">${this.trama}</p>
  </div>
</div>`;
    const boton = document.createElement('button');
    boton.addEventListener('click', () => this.cambiarFavorito(this.index, !this.esFavorito));
    boton.className = this.esFavorito ? 'btn btn-secondary' : 'btn btn-primary';
    boton.innerText = this.esFavorito ? 'Remover de Favoritos' : 'Agregar a Favoritos';
    col.getElementsByClassName('card-body')[1].appendChild(boton);
    col.className = 'col-6';
    return col;
  }

}
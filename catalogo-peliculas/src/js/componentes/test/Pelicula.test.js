import chai from "chai";
import chaiSpies from "chai-spies";
import jsdomGlobal from "jsdom-global";

import Pelicula from "../Pelicula.js";

chai.use(chaiSpies);
jsdomGlobal();

const mockPelicula = {
  index: 0,
  titulo: "Título película",
  descripcion: "Descripción película",
  anio_estreno: 2019,
  idioma: "Inglés",
  trama: "Trama película",
  pais: "Estados Unidos",
  generos: "Acción, Aventura, Fantasía",
  clasificacion: "PG-13",
  esFavorito: false,
};



const cambiarFavoritoMock = chai.spy();

describe('Pelicula', () => {

  it('debe crear una instancia de pelicula', () => {
    const pelicula = new Pelicula(mockPelicula, cambiarFavoritoMock);
    chai.expect(pelicula).not.to.be.undefined;
  });

  it('debe llamar método que se pasa como parámetro al hacer click en el botón', () => {
    const pelicula = new Pelicula(mockPelicula, cambiarFavoritoMock);
    document.body.appendChild(pelicula.render());

    const btnAgregarFavoritos = document.getElementsByTagName("button")[0];
    chai.expect(btnAgregarFavoritos).not.to.be.undefined;

    btnAgregarFavoritos.click();
    chai.expect(cambiarFavoritoMock).to.have.been.called.with(0, true);
  });

});
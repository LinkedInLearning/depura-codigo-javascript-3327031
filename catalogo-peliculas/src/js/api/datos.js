export const obtenerDatos = () => {
  return new Promise((resolve, reject) => {
    fetch('./peliculas.json',
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    ).then((respuesta) => {
      if (!respuesta.ok) {
        reject();
      }
      return respuesta.json();
    }).then((datosPeliculas) => {
      resolve(datosPeliculas.peliculas);
    }).catch(error => reject(error));
  });
};

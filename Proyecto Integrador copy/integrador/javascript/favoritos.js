console.log("hola");
function agregarFav(id){
    var arrayFavoritos = JSON.parse(window.sessionStorage.getItem('favoritos'));
    console.log(arrayFavoritos);

  // Me fijo saber si existe el array, si existe lo creamos.
  if (arrayFavoritos == null) {
  var arrayFavoritos = []
  // Como no existia se creo pero vacio.
  }

  // ME asegure que el array exista porque sino el index of me tira un error.
  if (arrayFavoritos.indexOf(id) >= 0) {
    arrayFavoritos.splice(arrayFavoritos.indexOf(id), 1);
    console.log(arrayFavoritos);
    window.sessionStorage.setItem('favoritos', JSON.stringify(arrayFavoritos));
    document.querySelector("button.fav").innerHTML="Add to favorites"

  }else {
    arrayFavoritos.push(id)
    console.log(arrayFavoritos);
    window.sessionStorage.setItem('favoritos', JSON.stringify(arrayFavoritos));
    // agregarlo a favoritos
    document.querySelector("button.fav").innerHTML="remove from favorites"

}

}

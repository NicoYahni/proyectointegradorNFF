window.onload = function() {
  var queryString = new URLSearchParams(location.search)
  var buscador = queryString.get("buscador")

  fetch("https://api.giphy.com/v1/gifs/search?api_key=lp7wQ6914aPRmDI6HePRPpQeZXyxLFkU&q=" + buscador +"&limit=25&offset=0&rating=G&lang=en")
    .then(function(respuesta) {
      return respuesta.json()
    })
    .then(function(informacion) {
      console.log(informacion);

      var arrayDeGifs = informacion.data
      console.log(arrayDeGifs);

      for (var i = 0; i < arrayDeGifs.length; i++) {
        var id = arrayDeGifs[i].id
        var title = arrayDeGifs[i].title
        var url = arrayDeGifs[i].images.original.url

        document.querySelector("div").innerHTML += "<p><a href=detalleGif.html?id=" + id + ">" + title + "</a></p>"
        document.querySelector("div").innerHTML += "<img src=" + url + ">"
      }
    })
    .catch(function(error) {
      console.log("Error: " + error);
    })
}

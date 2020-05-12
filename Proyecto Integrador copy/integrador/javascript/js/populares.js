window.onload = function() {


  fetch("https://api.giphy.com/v1/gifs/trending?api_key=lp7wQ6914aPRmDI6HePRPpQeZXyxLFkU&limit=25&rating=G")
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

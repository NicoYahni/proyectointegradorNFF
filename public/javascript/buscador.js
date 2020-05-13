window.addEventListener("load", function(){
  var API_KEY= "8fe7ed2a38151374ac57c4c5cd8d8a01"
  var urlSearchParams = new URLSearchParams(window.location.search)
  var buscador = urlSearchParams.get('buscador')
  console.log(buscador);

var url = "https://api.themoviedb.org/3/search/movie?api_key="+API_KEY+"&language=en-US&query="+buscador+"&page=1&include_adult=false"
fetch(url)
  .then(function(response){
    return response.json();
  })
  .then(function(objetoLiteralRespuesta){
    console.log(objetoLiteralRespuesta);
    //Guardo el array de peliculas
    var arrayDePeliculas = objetoLiteralRespuesta.results
    //Capturo el ul
    var ul = document.querySelector('#resultados')


    var li = ""
    //Parte fija de la url de la imagen
    var urlImg = "https://image.tmdb.org/t/p/original"
    //Recorro el array de peliculas
    var titulo = "${movie[i].title}"
    for (var i = 0; i < arrayDePeliculas.length; i++){
      li = "<li>"
      li += "<a href= 'detalles.html?IdDePeliculas="+arrayDePeliculas[i].id+"'>"
      li += "<img src='"+urlImg + arrayDePeliculas[i].poster_path+"' style='width:300px;'>"
      li += "</a>"
      li += "</li>"

      ul.innerHTML += li

    }
  })
  .catch(function(error){
    console.log("the error was: " + error);
  })
})

var username = sessionStorage.getItem("Username");
console.log(username)
if (username.length>0) {
  var usernameh2 = document.querySelector(".logeado")
  usernameh2.innerHTML = "Bienvenido <span>" + username + "</span>";
  var usernameh2 = document.querySelector(".login")
  usernameh2.style.display = "none"
}

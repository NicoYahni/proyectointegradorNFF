fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=8fe7ed2a38151374ac57c4c5cd8d8a01&language=en-US&page=1")
  .then(function(response) {
    return response.json();

  })
  .then(function  (response) {
    console.log(response);
    console.log(response.results);
    var movie = response.results;
    var output = "";
    for(var i = 0; i < movie.length; i++){
      var id = response.results[i].id;
      id = JSON.stringify(id);
      console.log(id);

    {
        var estrellas = '';
        for (var j = 1; j < movie[i].vote_average; j++) {
          estrellas = estrellas + "<ion-icon class='animated flash infinite' name='star'></ion-icon>"
        }


        output += `

        <div class="col-md-3 ">

        <div class="well text-center">

        <img src="http://image.tmdb.org/t/p/w400/${movie[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
        <h4 >${movie[i].title}</h4>
        <h5><span>${movie[i].vote_average} ` + estrellas + `</span></h5>
        <a onclick= "movieSelected('${movie[i].id}')"  class= " btn btn-primary" href="detalles.html?IdDePeliculas=${id}"> Movie Details</a>

        </div>
        </div>
        `;
        console.log(movie[i].id);
      }
    }
    // Display movies.
    var movieInfo = document.getElementById("movies");
    movieInfo.innerHTML = output;



  })
  // If theres an error, logs the error in console.
  .catch( (err) =>{
    console.log(err);
  })


var vacios = document.getElementsByClassName("vacio"); // If theres an error, logs the error in console.
var llenos = document.getElementsByClassName("lleno");





var username = sessionStorage.getItem("Username");
console.log(username)
if (username.length>0) {
  var usernameh2 = document.querySelector(".logeado")
  usernameh2.innerHTML = "Bienvenido <span>" + username + "</span>";
  var usernameh2 = document.querySelector(".login")
  usernameh2.style.display = "none"
}

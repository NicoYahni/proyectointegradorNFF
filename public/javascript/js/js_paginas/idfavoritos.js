window.addEventListener("load",function(){

var arrayFavoritos = JSON.parse(window.sessionStorage.getItem('favoritos'));
if (arrayFavoritos != null) {


for (var i = 0; i < arrayFavoritos.length; i++) {

  fetch("https://api.themoviedb.org/3/movie/" + arrayFavoritos[i] + "?api_key=8fe7ed2a38151374ac57c4c5cd8d8a01&language=en-US")
    .then(function(response) {
      return response.json();
    })
    .then(function(favo) {
      console.log(favo);


        var output = "";



          var estrellas = '';
          for (var j = 1; j < favo.vote_average; j++) {
            estrellas = estrellas + "<ion-icon class='animated flash infinite' name='star'></ion-icon>"
          }


          output += `

          <div class="col-md-3">

          <div class="well text-center">
          <img src="http://image.tmdb.org/t/p/w400/${favo.poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
          <h4>${favo.title}</h4>
            <h5><span>${favo.vote_average} ` + estrellas + `</span></h5>
            <a onclick= "movieSelected('${favo.id}')"  class= " btn btn-primary" href="detalles.html?IdDePeliculas=${favo.id}"> Movie Details</a>


          </div>
          </div>
          `;



      var movieInfo = document.querySelector("div#movies");
      movieInfo.innerHTML += output;



    })
    // If theres an error, logs the error in console.
    .catch( (err) =>{
      console.log(err);
    })
}


}
})

window.addEventListener("load",function(){
  var API_KEY= "8fe7ed2a38151374ac57c4c5cd8d8a01"
  var urlSearchParams = new URLSearchParams(window.location.search)
  var id = urlSearchParams.get('IdDePeliculas')
  console.log(id);

  fetch("https://api.themoviedb.org/3/movie/" + id + "?api_key=8fe7ed2a38151374ac57c4c5cd8d8a01&language=en-US")
    .then(function(response) {
      return response.json();

    })
    .then(function(objetoLiteralPelicula) {
      console.log(objetoLiteralPelicula);
     var output = "";
     var genero = "";
     for(var i = 0; i < objetoLiteralPelicula.genres.length; i++){
        var id = objetoLiteralPelicula.genres[i].id;
        var name = objetoLiteralPelicula.genres[i].name;
       console.log(name);
       console.log(id);


        genero += "<a href='tiposdegeneros.html?idDeGenero="+id+"&genero="+name+"'>"+  name +  "</a>";
      console.log(genero);
     }
  fetch("https://api.themoviedb.org/3/movie/" + objetoLiteralPelicula.id + "/videos?api_key=8fe7ed2a38151374ac57c4c5cd8d8a01&language=en-US")
       .then(function(response) {
         return response.json();
       })
       .then(function(objetoLiteralTrailer) {
         console.log(objetoLiteralTrailer);
         if (objetoLiteralTrailer.results.length > 0) {
           var key = objetoLiteralTrailer.results[0].key
           var trailer = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+ key +'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'

         } else {
           var trailer = ""
         }

         fetch("https://api.themoviedb.org/3/movie/" + objetoLiteralPelicula.id  + "/recommendations?api_key=8fe7ed2a38151374ac57c4c5cd8d8a01&language=en-US&page=1")
           .then(function(response) {
             return response.json();

           })
           .then(function  (response) {
             console.log(response);
             console.log(response.results);
             var recomendadas = response.results;
            var output = "";
             for(var i = 0; i < recomendadas.length; i++){
              var id = response.results[i].id;
               id = JSON.stringify(id);
               console.log(id);
               output += `
               <div class="col-md-3">

               <div class="well text-center">
               <img src="http://image.tmdb.org/t/p/w400/${recomendadas[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
               <h4>${recomendadas[i].title}</h4>

               <a   class= " btn btn-primary" href="detalles.html?IdDePeliculas=${recomendadas[i].id}"> Movie Details</a>


               </div>
               </div>
               `


                var movieInfo = document.getElementById("recomenda");
                 movieInfo.innerHTML = output;

             }


           })
           // If theres an error, logs the error in console.
           .catch( (err) =>{
             console.log(err);
           })



         output += `
         <div class="row">
                   <div class="col-md-4">
                     <img src="http://image.tmdb.org/t/p/w400/${objetoLiteralPelicula.poster_path}" class="thumbnail">
                   </div>
                   <div class="col-md-8">
                     <h2>${objetoLiteralPelicula.title}</h2>
                     <ul class="list-group">
                       <li class="list-group-item"><strong>Genre:</strong> ${genero}</li>
                       <li class="list-group-item"><strong>Released:</strong> ${objetoLiteralPelicula.release_date}</li>
                       <li class="list-group-item"><strong>Language:</strong> ${objetoLiteralPelicula.original_language}</li>
                       <li class="list-group-item"><strong>Tagline:</strong> ${objetoLiteralPelicula.tagline}</li>
                       <li class="list-group-item"><strong>Overview:</strong> ${objetoLiteralPelicula.overview}</li>
                       <li class="list-group-item"><button class= "fav" onclick="agregarFav(${objetoLiteralPelicula.id})">Add to favorites </button></li>
                      <li class="list-group-item"><strong></strong> ${trailer}</li>
                     </ul>
                   </div>
                 </div>



         `;
         console.log(objetoLiteralPelicula.id);


       // Display movies.
      var movieInfo = document.getElementById("movies");
       movieInfo.innerHTML = output;

       })
       // If theres an error, logs the error in console.
       .catch( (err) =>{
         console.log(err);
       })

    })
    // If theres an error, logs the error in console.
    .catch( (err) =>{
      console.log(err);
    })


})

var username = sessionStorage.getItem("Username");
console.log(username)
if (username != null && username.length>0) {
  var usernameh2 = document.querySelector(".logeado")
  usernameh2.innerHTML = "Bienvenido <span>" + username + "</span>";
  var usernameh2 = document.querySelector(".login")
  usernameh2.style.display = "none"
}

// function agregarFav(id) {
// if (sessionStorage.getItem("Movies") == null) {
//   var favorita = []
//   favorita.push(id)
//   window.localStorage.setItem('Movies', JSON.stringify(favorita));
// }
// else {
//   JSON.parse(window.localStorage.setItem('Movies'));
//   favorita.push(id)
//
// }
//   sessionStorage.setItem("Movies", id)
// }

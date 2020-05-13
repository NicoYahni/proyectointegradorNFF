window.addEventListener("load",function(){
  var API_KEY= "8fe7ed2a38151374ac57c4c5cd8d8a01"
  var urlSearchParams = new URLSearchParams(window.location.search)
  var id = urlSearchParams.get('idDeGenero')
  var nombre = urlSearchParams.get('genero')
  console.log(id);



fetch("https://api.themoviedb.org/3/discover/movie?api_key=8fe7ed2a38151374ac57c4c5cd8d8a01&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres="  + id )
  .then(function(response) {
    return response.json();
  })
  .then(function  (response) {
    console.log(response);
    console.log(response.results);
    let movie = response.results;
    var output = "";
    output += `


      <h2>${nombre}</h2>



    `;
    for(let i = 0; i < movie.length; i++){
      let id = response.results[i].id;
      id = JSON.stringify(id);
      console.log(id);



        output += `

        <div class="col-md-3">

        <div class="well text-center">

        <img src="http://image.tmdb.org/t/p/w400/${movie[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
        <h4 >${movie[i].title}</h4>

        <a onclick= "movieSelected('${movie[i].id}')"  class= " btn btn-primary" href="detalles.html?IdDePeliculas=${id}"> Movie Details</a>

        </div>
        </div>
        `;
        console.log(movie[i].id);
      }

    // Display movies.
    let movieInfo = document.getElementById("generos");
    movieInfo.innerHTML = output;



  })
  // If theres an error, logs the error in console.
  .catch( (err) =>{
    console.log(err);
  })
})

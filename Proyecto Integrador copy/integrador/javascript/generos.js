window.addEventListener("load",function(){
fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=8fe7ed2a38151374ac57c4c5cd8d8a01&language=en-US")
  .then(function(response) {
    return response.json();
  })
  .then(function (response) {
    console.log(response);
    var genero = response.genres;
    var output = "";
    for(var i = 0; i < genero.length; i++){
      var id = response.genres[i].id;
      id = JSON.stringify(id);
      console.log(id);



        output += `

        <div class="col-md-3">

        <div class="well text-center">


            <h4 > <a href='tiposdegeneros.html?idDeGenero=${genero[i].id}&genero=${genero[i].name}'> ${genero[i].name} </a></h4>



        </div>
        </div>
        `;
        console.log(genero[i].id);
      }

    var movieInfo = document.getElementById("generos");
    movieInfo.innerHTML = output;



  })
  .catch( (err) =>{
    console.log(err);
  })



})

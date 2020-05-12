window.addEventListener("load",function(){
  var API_KEY= "8fe7ed2a38151374ac57c4c5cd8d8a01"
  var urlSearchParams = new URLSearchParams(window.location.search)
  var id = urlSearchParams.get('IdDeActores')
  console.log(id);

  fetch("https://api.themoviedb.org/3/person/" + id + "?api_key=8fe7ed2a38151374ac57c4c5cd8d8a01&language=en-US")
    .then(function(response) {
      return response.json();

    })
    .then(function(objetoLiteralActor) {
      console.log(objetoLiteralActor);
      var output = "";
     var genero = "";

     fetch("https://api.themoviedb.org/3/person/" + objetoLiteralActor.id  + "/movie_credits?api_key=8fe7ed2a38151374ac57c4c5cd8d8a01&language=en-US&page=1")
       .then(function(response) {
         return response.json();

       })
       .then(function  (response) {
         console.log(response);
         console.log(response.results);
         var credits = response.results;
         var output = "";
         for(var i = 0; i < response.length; i++){
           var id = response.results[i].id;
           id = JSON.stringify(id);
           console.log(id);
           output += `
           <div class="col-md-3">

           <div class="well text-center">
           <img src="http://image.tmdb.org/t/p/w400/${credits[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
           <h4>${credits[i].title}</h4>

           <a onclick= "movieSelected('${credits[i].id}')"  class= " btn btn-primary" href="detalles.html?IdDePeliculas=${credits[i].id}"> Movie Details</a>


           </div>
           </div>
           `


             var movieInfo = document.getElementById("credits");
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
                    <img src="http://image.tmdb.org/t/p/w400/${objetoLiteralActor.profile_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
                   </div>
                   <div class="col-md-8">
                     <h2>${objetoLiteralActor.name}</h2>
                     <ul class="list-group">

                       <li class="list-group-item"><strong>Birthday:</strong> ${objetoLiteralActor.birthday}</li>
                       <li class="list-group-item"><strong>Place Of Birth:</strong> ${objetoLiteralActor.place_of_birth}</li>
                       <li class="list-group-item"><strong>Popularity:</strong> ${objetoLiteralActor.popularity}</li>
                       <li class="list-group-item"><strong>Biography:</strong> ${objetoLiteralActor.biography}</li>

                     </ul>
                   </div>
                 </div>



         `;
         console.log(objetoLiteralActor.id);


       // Display movies.
       let movieInfo = document.getElementById("actores");
       movieInfo.innerHTML = output;

       })
  })

    // If theres an error, logs the error in console.

    var username = sessionStorage.getItem("Username");
    console.log(username)
    if (username.length>0) {
      var usernameh2 = document.querySelector(".logeado")
      usernameh2.innerHTML = "Bienvenido <span>" + username + "</span>";
      var usernameh2 = document.querySelector(".login")
      usernameh2.style.display = "none"
    }

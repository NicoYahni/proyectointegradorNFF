fetch("https://api.themoviedb.org/3/person/popular?api_key=8fe7ed2a38151374ac57c4c5cd8d8a01&language=en-US&page=1")
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    console.log(response);
    console.log(response.results);
    var actors = response.results;
    var output = "";
    for(var i = 0; i < actors.length; i++){
      var id = response.results[i].id;
      id = JSON.stringify(id);
      console.log(id);

      {


        output += `

        <div class="col-md-3">

        <div class="well text-center">
        <img src="http://image.tmdb.org/t/p/w400/${actors[i].profile_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
        <h4>${actors[i].name}</h4>

          <a onclick= "movieSelected('${actors[i].id}')"  class= " btn btn-primary" href="actoresdetalles.html?IdDeActores=${actors[i].id}"> Actor Details</a>


        </div>
        </div>
        `;
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



var username = sessionStorage.getItem("Username");
console.log(username)
if (username.length>0) {
  var usernameh2 = document.querySelector(".logeado")
  usernameh2.innerHTML = "Bienvenido <span>" + username + "</span>";
  var usernameh2 = document.querySelector(".login")
  usernameh2.style.display = "none"
}

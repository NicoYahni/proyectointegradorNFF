fetch("https://api.giphy.com/v1/gifs/random?api_key=lp7wQ6914aPRmDI6HePRPpQeZXyxLFkU&tag=&rating=G")
  .then(function(response) {
    return response.json();
  })
  .then(function(resultado) {
    console.log(resultado.data.image_url);
    document.querySelector(".avatar-user").src = resultado.data.image_url
  })
  .catch(function(error) {
    console.log(error);
  })

document.querySelector("form.box").addEventListener("submit", function(event){

  var username = document.querySelector("input[name=U]").value
  console.log(username);
  var email = document.querySelector("input[name=E]").value

  var sex = document.querySelector("input[name=S]").value
if(username.length>0 && email.length>0 && sex.length>0 ){

  sessionStorage.setItem("Username", username );
  sessionStorage.getItem("Username");

  sessionStorage.setItem("Email", email);
  sessionStorage.getItem("Email");

  sessionStorage.setItem("Sex", sex );
  sessionStorage.getItem("Sex");


}
else{
  console.log("no data");
  event.preventDefault()
var bloqueado = document.querySelector(" .contenido-bloqueado")
  bloqueado.style.display = "block"
var bloqueado = document.querySelector(".dos")
  bloqueado.style.display = "block"

}
})

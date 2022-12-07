
window.onload= function(){

    const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

    let email= document.getElementById("email")
    let password= document.getElementById("password")
  
    let emailError= document.getElementById("errorEmail")
    let passwordError= document.getElementById("errorpassword")

    let formulario = document.getElementById("formulario");

  
//email
email.addEventListener("focus", function () {
emailError.innerHTML = "";
});



email.addEventListener("blur",  function (e) {
switch (true) {
case email.value === "":
    
    emailError.innerHTML = "Debe ingresar el email";
    break;
case !exRegEmail.test(this.value):
    emailError.innerHTML = "El Formato de email no es valido";
    break;
} 
});


//contraseña
password.addEventListener("focus", function () {
passwordError.innerHTML = "";
});

password.addEventListener("blur", function () {
switch (true) {
case password.value === "":
passwordError.innerHTML = "Debe ingresar una contraseña";
break;
}
})


//Button disable
formulario.addEventListener("submit", function (e) {
if ( password.value === "" || email.value === "") {
e.preventDefault();// detengo la funcion del boton
}
});

}
const $ = (element) => document.getElementById(element);

console.log("userRegister success!");
console.log("maxi");
  
const exRegAlfa = /^[ÁÉÍÓÚA-Z][a-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$/;

const msgError = (element, msg, { target }) => {
  $(element).innerText = msg;
  target.classList.add("form__label input-invalid"); // aca tenes que poner una clase para que esten rojos los input
};

const cleanField = (element, target) => {
  $(element).innerText = null;
  target.classList.remove("form__label input-invalid");
};

const validField = () => {

}

$("name").addEventListener("blur", function (e) {
  switch (true) {
    case !this.value.trim():
      msgError("errorNombre", "El nombre es obligatorio", e); 
          /*console.log("userRegister success!");*/
      break;
    case !this.value.trim().length < 2:
      msgError("errorNombre", "El nombre debe tener como minimo dos caracteres", e);
      break;
      case !exRegAlfa.test(this.value):
          msgError("errorNombre" , "solo se permiten caracteres alfabeticos" ,e);
      break;    
    default:
      break;
  }
});

$("name").addEventListener("focus", function ({ target }) {
  cleanField("errorNombre", target);
});


$("surname").addEventListener("blur", function (e) {
    switch (true) {
      case !this.value.trim():
        msgError("errorApellido", "El Apellido es obligatorio", e); 
            /*console.log("userRegister success!");*/
        break;
      case !this.value.trim().length < 2:
        msgError("errorApellido", "El Apellido debe tener como minimo dos caracteres", e);
        break;
        case !exRegAlfa.test(this.value):
            msgError("errorApellido" , "solo se permiten caracteres alfabeticos" ,e);
        break;    
      default:
        break;
    }
  });
  
  $("surname").addEventListener("focus", function ({ target }) {
    cleanField("errorApellido", target);
  });



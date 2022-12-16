console.log('productEdit connected success!');

const formProductEdit = $('formProductEdit');

const elements = formProductEdit.elements;

let totalCharacters = 200;

let numberCharacters = 200;

const msgError = (element, msg, { target }) => {
    $(element).innerText = msg;
    target.classList.add("input-invalid"); // aca tenes que poner una clase para que esten rojos los input
  };

  const cleanField = (element, target) => {
    $(element).innerText = null;
    target.classList.remove("input-invalid");
  };
  
  const validField = () => {
  
  }



$('name').addEventListener('focus', function(e){

    $('nameEditMsg').innerHTML = "Máximo 30 caracteres";
    $('nameEditMsg').style.color = "green";

    });

$('name').addEventListener('blur', function(e){

    switch (true) {
        case !this.value.trim():
            msgError('nameEditMsg', "El nombre del producto es requerido")
        break;
        case this.value.trim().length < 10:
            msgError('nameEditMsg', "El nombre debe tener como mínimo 10 caracteres")   
        break;
        default:
            $('nameEditMsg').innerHTML = null; 
         break;
}

});

$("name").addEventListener("focus", function ({ target }) {
    cleanField("nameEditMsg", target);
  });

$('price').addEventListener('focus', function(e){

    clean("priceEditMsg", e)

});

$('price').addEventListener('blur', function(e){

    switch (true) {
        case !this.value.trim():
            msgError('priceEditMsg', "El precio es requerido")
        break;
        case this.value < 0:
            msgError('priceEditMsg', "No puede ser un número negativo")   
        break;
        default:
            $('priceEditMsg').innerHTML = null; 
         break;
    }


});

$('price').addEventListener('keyup', function(e){

    let price = this.value;
    let discount = $("discount").value;

$('finalPrice').value = +price - (+price * +discount / 100)
});

$('discount').addEventListener('keyup', function(e){

    let price = $("price").value;
    let discount = this.value;

$('finalPrice').value = +price - (+price * +discount / 100)
});

$('description').addEventListener('focus', function(e){

    $('descriptionEditMsg').hidden = false;
    $('numberCharacters').innerHTML = numberCharacters;
    
});

$('description').addEventListener('blur', function(e){

    $('descriptionEditMsg').hidden = true;
    
});

$('description').addEventListener('keyup', function(e){

    numberCharacters = totalCharacters - +this.value.length;

    $('numberCharacters').innerHTML = numberCharacters;

});

formProductEdit.addEventListener("submit", function (e) {
    if ( $("name").value === "" || $("price").value === "" || $("description").value === "" || $("category").value === "") {
       console.log('Está vacío');
    e.preventDefault();// detengo la funcion del boton
    
    }
    })


const formProductAdd = $('formProductAdd');

const elements = formProductAdd.elements;

let totalCharacters = 200;

let numberCharacters = 200;

const msgError = (element, msg, { target }) => {

    $(element).innerText = msg;
    target.classList.remove("input-invalid");

};

const validField = (element, target) => {
    $(element).innerText = null;
    target?.classList.remove("input-invalid"); // target ==> input 
};

window.addEventListener('load', function () {



$('name').addEventListener('blur', (event) => {

    switch (true) {
        case !event.target.value?.trim():
            msgError('nameMsg', "El nombre del producto es requerido", event)
        break;
        case event.target.value?.trim().length < 10:
            msgError('nameMsg', "El nombre debe tener como mínimo 10 caracteres", event)   
        break;
        default:
            validField('nameMsg', event.target)
         break;
    }

    
});

/*$('price').addEventListener('focus', function(e){
    cleanError("priceMsg", e)

}); */

$('price').addEventListener('blur', function ({ target }) {

    switch (true) {
        case !target.value.trim():
            msgError('priceMsg', "El precio es requerido", { target })
        break;
        case target.value < 0:
            msgError('priceMsg', "No puede ser un número negativo", { target })   
        break;
        default:
             validField('priceMsg', target) 
         break;
    }

});

$('price').addEventListener('keyup', function (e) {

    let price = this.value;
    let discount = $("discount").value;

$('finalPrice').value = +price - (+price * +discount / 100)
});

$('discount').addEventListener('keyup', function (e) {

    let price = $("price").value;
    let discount = this.value;

$('finalPrice').value = +price - (+price * +discount / 100)
});

$('description').addEventListener('focus', function (e) {

    $('descriptionMsg').hidden = false;
    $('numberCharacters').innerHTML = numberCharacters;
    
});

$('description').addEventListener('blur', function (e) {

    $('descriptionMsg').hidden = true;
    
});

$('description').addEventListener('keyup', function (e) {

    numberCharacters = totalCharacters - +this.value.length;

    $('numberCharacters').innerHTML = numberCharacters;

});


formProductAdd.addEventListener("submit", function (e) {
    if ( $("name").value === "" || $("price").value === "" || $("description").value === "" || $("category").value === "") {
       console.log('Está vacío');
    
    e.preventDefault();// detengo la funcion del boton
    
    }
    })
})


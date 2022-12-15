console.log('productEdit connected success!');

const formProductEdit = $('formProductEdit');

const elements = formProductAdd.elements;

let totalCharacters = 200;

let numberCharacters = 200;

const msgError = (elemento, mensaje) => {

    $(elemento).style.color = "red";
    $(elemento).innerHTML = mensaje;
};

const cleanError = (elemento) => {
    $(elemento).innerHTML = null;
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

$('price').addEventListener('focus', function(e){

    cleanError("priceEditMsg", e)

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
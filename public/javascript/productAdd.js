console.log('productAdd connected success!');

const formProductAdd = $('formProductAdd');

const elements = formProductAdd.elements;

let totalCharacters = 200;

let numberCharacters = 200;

const msgError = (elemento, mensaje) => {

    $('elemento').innerHTML = mensaje;
}

$('name').addEventListener('focus', function(e){

    $('nameMsg').innerHTML = "El nombre debe tener como máximo 30 caracteres";

});

$('name').addEventListener('blur', function(e){

    switch (true) {
        case !this.value.trim():
            
            msgError("nameMsg", "El nombre del producto es requerido");

        break;

        case this.value.trim().length < 10:

        msgError("nameMsg", "El nombre debe tener como mínimo 10 caracteres");



        default:

            $('nameMsg').innerHTML = null;

        break;
    }

    
});

$('price').addEventListener('focus', function(e){

    $('priceMsg').innerHTML = "Mínimo 0";

});

$('price').addEventListener('blur', function(e){

    $('priceMsg').innerHTML = null;
});

$('price').addEventListener('keyup', function(e){

    let price = this.value;
    let discount = $('discount').value;

$('finalPrice').value = +price - (+price * +discount / 100)
});

$('discount').addEventListener('keyup', function(e){

    let price = $('price').value;
    let discount = this.value;

$('finalPrice').value = +price - (+price * +discount / 100)
});

$('description').addEventListener('focus', function(e){

    $('descriptionMsg').hidden = false;
    $('numberCharacters').innerHTML = numberCharacters;
    
});

$('description').addEventListener('blur', function(e){

    $('descriptionMsg').hidden = true;
    
});

$('description').addEventListener('keyup', function(e){

    numberCharacters = totalCharacters - +this.value.length;

    $('numberCharacters').innerHTML = numberCharacters;

});


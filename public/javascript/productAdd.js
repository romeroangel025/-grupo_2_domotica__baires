console.log('productAdd connected success!');

const formProductAdd = $('formProductAdd');

const elements = formProductAdd.elements;

let totalCharacters = 200;

let numberCharacters = 200;

const msgError = (elemento, mensaje) => {

    $('elemento').innerHTML = mensaje;
}

$('name').addEventListener('focus', function(e){

    $('nameMsg').innerHTML = "Máximo 30 caracteres";
    $('nameMsg').style.color = "green";

});

$('name').addEventListener('blur', function(e){

    $('nameMsg').innerHTML = null;
});

$('price').addEventListener('focus', function(e){

    $('priceMsg').innerHTML = "Mínimo 0";
    $('priceMsg').style.color = "green";

});

$('price').addEventListener('blur', function(e){

    $('priceMsg').innerHTML = null;

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


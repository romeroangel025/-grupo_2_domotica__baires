console.log('productEdit connected success!');

const formProductEdit = $('formProductEdit');

console.log(formProductEdit);

let totalCharacters = 200;

let numberCharacters = 200;

const msgError = (elemento, mensaje) => {

    $('elemento').innerHTML = mensaje;
}

$('name').addEventListener('focus', function(e){

    $('nameEditMsg').innerHTML = "Máximo 30 caracteres";
    $('nameEditMsg').style.color = "green";

    });

$('name').addEventListener('blur', function(e){

    $('nameEditMsg').innerHTML = null;
});

$('price').addEventListener('focus', function(e){

    $('priceEditMsg').innerHTML = "Mínimo 0";
    $('priceEditMsg').style.color = "green";

});

$('price').addEventListener('blur', function(e){

    $('priceEditMsg').innerHTML = null;

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
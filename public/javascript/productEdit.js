console.log('productEdit connected success!');

const formProductEdit = $('formProductEdit');

console.log(formProductEdit);

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

    $('priceMsg').innerHTML = "Mínimo 0";

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
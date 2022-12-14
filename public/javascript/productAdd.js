console.log('productAdd connected success!');

const formProductAdd = $('formProductAdd');

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
    cleanError("nameMsg", e)

});

$('name').addEventListener('blur', function(e){

    switch (true) {
        case !this.value.trim():
            msgError('nameMsg', "El nombre del producto es requerido")
        break;
        case this.value.trim().length < 10:
            msgError('nameMsg', "El nombre debe tener como mínimo 10 caracteres")   
        break;
        default:
            $('nameMsg').innerHTML = null; 
         break;
    }

    
});

$('price').addEventListener('focus', function(e){
    cleanError("priceMsg", e)

});

$('price').addEventListener('blur', function(e){

    switch (true) {
        case !this.value.trim():
            msgError('priceMsg', "El precio es requerido")
        break;
        case this.value < 0:
            msgError('priceMsg', "No puede ser un número negativo")   
        break;
        default:
            $('priceMsg').innerHTML = null; 
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

$('image').addEventListener('change', (e) => {


    let reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

})



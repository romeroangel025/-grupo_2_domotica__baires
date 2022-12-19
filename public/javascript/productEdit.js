const formProductEdit = $('formProductEdit');

const elements = formProductEdit.elements;

let totalCharacters = 200;

let numberCharacters = 200;

const msgError = (element, msg, { target }) => {
    $(element).innerText = msg;
    target.classList.add("input-invalid"); // aca tenes que poner una clase para que esten rojos los input
};

const validField = (element, target) => {
    $(element).innerText = null;
    target?.classList.remove("input-invalid"); // target ==> input 
};

/* $('name').addEventListener('focus', function (e) {

    $('nameEditMsg').innerHTML = "Máximo 30 caracteres";
    $('nameEditMsg').style.color = "green";

}); */

window.addEventListener('load', function () {


    $('name').addEventListener('blur', (event) => {
        switch (true) {
            case !event.target.value?.trim():
                msgError('nameEditMsg', "El nombre del producto es requerido", event)
                break;
            case event.target.value?.trim().length < 10:
                msgError('nameEditMsg', "El nombre debe tener como mínimo 10 caracteres", event)
                break;
            default:
                validField('nameEditMsg', event.target)
                break;
        }

    });

    /* $("name").addEventListener("focus", function ({ target }) {
        validField("nameEditMsg", target);
    });
    
    $('price').addEventListener('focus', function (e) {
    
        clean("priceEditMsg", e)
    
    }); */

    $('price').addEventListener('blur', function ({ target }) {

        switch (true) {
            case !target.value.trim():
                msgError('priceEditMsg', "El precio es requerido", { target })
                break;
            case target.value < 0:
                msgError('priceEditMsg', "No puede ser un número negativo", { target })
                break;
            default:
                validField('priceEditMsg', target)
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

        $('descriptionEditMsg').hidden = false;
        $('numberCharacters').innerHTML = numberCharacters;

    });

    $('description').addEventListener('blur', function (e) {

        $('descriptionEditMsg').hidden = true;

    });

    $('description').addEventListener('keyup', function (e) {

        numberCharacters = totalCharacters - +this.value.length;

        $('numberCharacters').innerHTML = numberCharacters;

    });

    formProductEdit.addEventListener("submit", function (e) {
        if ( $("name").value === "" || $("price").value === "" || $("description").value === "" || $("category").value === "") {
            console.log('Está vacío');
            
            e.preventDefault();// detengo la funcion del boton

        }
    })

})
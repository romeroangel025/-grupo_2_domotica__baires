console.log('cart.js connected');
 

const carrito = document.getElementById('cart-items');
const totalCart = document.getElementById('total-order');
const showItems = (items, total) => {
    if(carrito){
    
    carrito.innerHTML = null;

   if(items.length){
       items.forEach(({quantity, product}) => {
           carrito.innerHTML += `
          <article class="carrito_main_section_article">
                    <div class="carrito_main_section_article_imagen">
                        <img src="/imagenes/imageProducts/${product.images[0].name}" alt="">
                    </div>
                    <div class="carrito_main_section_article_datos">
                        <div>
                            <p>${product.title}</p>
                        </div>
                        <div>
                            <form action="">
                            <button class="menos" onclick="event.preventDefault(); removeCartItem('${product.id}')">- </button>
                            <button class="numero">${quantity}</button>
                            <button class="mas" onclick="event.preventDefault(); addCartItem('${product.id}')"> +</button>
                            </form>
                        </div>
                    </div>
                    <div class="carrito_main_section_article_precio">
                    <h2 onclick="removeCartAllItem('${product.id}')"><i class="fa-regular fa-trash-can"></i></h2>
                    <P>$${product.price}</P>
                    </div>
                </article>
           `
       });
       totalCart.innerHTML = `$ ${total}`
   }

}
}

const getCart = async () => {

    try {

        let response = await fetch('/api/cart');
        let result = await response.json();

        if(result.ok){
            const {items, total} = result.data;
            showItems(items, total)
        }        
        
    } catch (error) {
        console.error
    }

}



 const addCartItem = async (id) => {
   try {

       let response = await fetch('/APIs/cart', {
           method : 'POST',
           body : JSON.stringify({
               id
           }),
           headers : {
               "Content-Type" : "application/json"
           }
       });

       let result = await response.json();
       console.log(result.data.total);

       if(result.ok){
           const {items, total} = result.data;

           showItems(items, total)
       }
       
   } catch (error) {
       console.error(error);
   }
   
};

const removeCartItem = async (id) => {
   try {

       let response = await fetch('/APIs/cart/' + id, {
           method : 'DELETE'
       });

       let result = await response.json();
       console.log(result.data.total);

       if(result.ok) {
           showItems( result.data.items, result.data.total)
       }

       
   } catch (error) {
       console.error(error);
   }
}

const removeCartAllItem = async (id) => {
    try {
 
        let response = await fetch('/APIs/cart/all/' + id, {
            method : 'DELETE'
        });
 
        let result = await response.json();
 
        if(result.ok) {

            showItems( result.data.items, result.data.total)
        }
 
        
    } catch (error) {
        console.error(error);
    }
 }


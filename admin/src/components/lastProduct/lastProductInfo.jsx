import React from 'react'

export const LastProductInfo = (product) => {
  console.log(product);
  console.log(product.data);
  let {title, price, discount, description, category_id, images }= product.data
  return (
    
    <div className="card">
    <div className="card-header">
        <h5>Información</h5>
    </div>
    <div className="card-body">
    <img className='img-thumbnail' src={images && images[0].urlImage} alt=""/>
        <ul className="list-group list-group-flush">
            <li className="list-group-item">
                <label>Nombre:</label>
                <p className='m-0'><b>{title}</b></p>
            </li>
            
            <li className="list-group-item">
                <label>Categoría:</label>
                <p className='m-0'><b>{category_id}</b></p>
            </li>
            <li className="list-group-item">
                <label>Descripción:</label>
                <p className='m-0'><b>{description}</b></p>
            </li>
        </ul>
    </div>
</div>
  )
 
}
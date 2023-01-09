import React from 'react'
import { Row } from './Row';



export const Table = ({products, getInfo}) => {
    
  return (


<div className='table-responsive'>
        <table className="table table-striped table-dark">
            <thead>
            <tr>
          <th scope="col">Id de producto</th>
          <th scope="col">Titulo</th>
         <th scope="col">Descuento</th>
          <th scope="col">Precio</th>
        </tr>
            </thead>
            <tbody>
                
                {
                   products.products?.map((product) => <Row  getInfo={getInfo} {...product} key={product.id} />)
                }

            </tbody>
        </table>
        </div>



  )
}

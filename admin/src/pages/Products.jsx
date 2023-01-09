import React, { useEffect, useState } from "react";
import { Table } from "../components/products/Table";
import { Info } from "../components/products/Info";
import { UseFetch } from "../hooks/UseFetch";

export const Products = () => {

  const [products, setProducts] = useState({
    loading: true,
    data:[]
  });

  useEffect(() => {
    UseFetch('/products').then(({ meta, data }) => {
      if (meta.ok) {
        setProducts({
            loading : false,
            data
        });

      }
    }).catch(error => console.log (error))
  }, []);
 
  const [product, setProduct] = useState([]);


  const getInfo = (id) => {
    UseFetch(`/products/${id}`)
      .then(({ ok, data }) => {

        if (ok) {
          setProduct(data)
          console.log(data);
        }
      }).catch(() => console.error)
  }


  return (
   
    <div className='container'>
    <div className="row">
      <div className="col-8">
        <div className="card">
          <div className="card-header">
            <h5>Productos</h5>
          </div>
          <div className="card-body">
            {
              products.loading?<p>cargando......</p>: <Table getInfo={getInfo} products={products.data}/>
            }
          </div>
        </div>
      </div>
      <div className="col-4">
       
         {
         
         <Info
         {...product}
       />


        } 
      </div>
    </div>

  </div>  
   








   

   
    
    
  );


  
};

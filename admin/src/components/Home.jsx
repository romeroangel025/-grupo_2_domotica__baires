

import React from 'react';
import { Categories } from './categories/Categories';
import { LastProduct } from 'lastProduct/LastProduct';
import {Metrics} from './metricas/Metrics'
import { UseFetch } from '../hooks/UseFetch';

export const Home = () => {

  



  return (
    <div className="container-fluid">
    <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800 mt-2">Panel de Administrador</h1>
    </div>

    <Metrics/>




    <div className="row">

    

    <Categories/>

    
    </div>
</div>
  )
}
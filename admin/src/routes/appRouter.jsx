import React from "react";
import { Route,createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root/>}>

        </Route>
    )
)
export const appRouter =() => {
    return <RouterProvider router = {router}/>
       
    
}
const express = require("express");
const path = require("path");
const app = express();
const port =3030;

/* Rutas*/

app.use(express.static("public"));

app.get("/",(req,res)=>res.sendFile(path.resolve(__dirname,"views","productDetail.html")))
app.get("/DetalleDelProducto",(req,res)=>res.sendFile(path.resolve(__dirname,"views","productDetail.html")))
app.get("/CarritoDeCompras",(req,res)=>res.sendFile(path.resolve(__dirname,"views","productCart.html")))
app.get("/Registro",(req,res)=>res.sendFile(path.resolve(__dirname,"views","register.html")))
app.get("/InicioDeSesion",(req,res)=>res.sendFile(path.resolve(__dirname,"views","login.html")))


app.listen(port,() => console.log(`Server en funcionamiento ${port}`))









import express from 'express';
import { fetch, create, update, deleteProducto } from '../controller/productosController.js';

const productosRoute = express.Router();

productosRoute.post("/create", create);
productosRoute.get("/getAllProducts", fetch);
productosRoute.put("/update/:id", update);
productosRoute.delete("/delete/:id", deleteProducto);

export default productosRoute;
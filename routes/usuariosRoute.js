import express from "express";
import { fetch, create, update, deleteUsuario } from "../controller/usuariosController.js";
import Usuario from "../model/usuariosModel.js";
import Producto from "../model/productosModel.js";

const usuariosRoute = express.Router();

usuariosRoute.post("/create", create);
usuariosRoute.get("/getAllUsers", fetch);
usuariosRoute.put("/update/:id", update);
usuariosRoute.delete("/delete/:id", deleteUsuario);

usuariosRoute.get("/contadores", async (req, res) => {
    try {
        const totalUsuarios = await Usuario.countDocuments();
        const totalProductos = await Producto.countDocuments();

        res.status(200).json({
            totalUsuarios,
            totalProductos: total
        });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los contadores", detalle: error.message });
    }
});
export default usuariosRoute;
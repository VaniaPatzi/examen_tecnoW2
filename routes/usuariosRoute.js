import express from "express";
import { fetch, create, update, deleteUsuario } from "../controller/usuariosController.js";

const usuariosRoute = express.Router();

usuariosRoute.post("/create", create);
usuariosRoute.get("/getAllUsers", fetch);
usuariosRoute.put("/update/:id", update);
usuariosRoute.delete("/delete/:id", deleteUsuario);

export default usuariosRoute;
import express from "express";
import { fetch, create, update, deleteUsuario } from "../controller/usuariosController.js";

const route = express.Router();

route.post("/create", create);
route.get("/getAllUsers", fetch);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteUsuario);

export default route;
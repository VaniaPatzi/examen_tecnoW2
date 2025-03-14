import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import usuariosRoute from "./routes/usuariosRoute.js";
import productosRoute from "./routes/productosRoute.js";
import Usuario from "./model/usuariosModel.js";  // Importar el modelo Usuario
import Producto from "./model/productosModel.js";

const app = express();

app.use(bodyParser.json());
dotenv.config();

let operacionesCount = 0;  // Contador para las operaciones

// Middleware para contar las operaciones
app.use((req, res, next) => {
    operacionesCount++;  
    next();  // Llamar al siguiente middleware o controlador
});

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;
//conexion a la base de datos
mongoose.connect(MONGOURL).then(() => {
  console.log("Conectado a MongoDB.")
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto: ${PORT}`);
  });
}).catch((error) => {
  console.log("Error al conectar a MongoDB: ", error);
});
//rutas
app.use("/api/usuarios", usuariosRoute);
app.use("/api/productos", productosRoute);
//endpoint contadores
app.get("/contadores", async (req, res) => {
    try {
        const totalUsuarios = await Usuario.countDocuments();
        const totalProductos = await Producto.countDocuments();
        
        res.json({
            totalUsuarios,
            totalProductos: totalUsuarios
        });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener contadores", detalle: error.message });
    }
});
//endpoint para las operaciones
app.get("/operaciones", (req, res) => {
    res.json({ totalOperaciones: operacionesCount });
});

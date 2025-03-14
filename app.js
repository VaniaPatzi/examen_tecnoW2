import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import usuariosRoute from "./routes/usuariosRoute.js";
import productosRoute from "./routes/productosRoute.js";

const app = express();

app.use(bodyParser.json());
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(() => {
  console.log("Conectado a MongoDB.")
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto: ${PORT}`);
  });
}).catch((error) => {
  console.log("Error al conectar a MongoDB: ", error);
});

app.use("/api/usuarios", usuariosRoute);
app.use("/api/productos", productosRoute);

import mongoose from "mongoose";

const usuariosSchema = new mongoose.Schema({
  nombre: String,
  edad: Number,
  ocupacion: String
});

export default mongoose.model("usuarios", usuariosSchema);
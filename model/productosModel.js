import mongoose from "mongoose";

const productosSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  categoria: String
});

export default mongoose.model("productos", productosSchema);


import Producto from "../model/productosModel.js";

export const create = async (req, res) => {
    try {
        const productoData = new Producto(req.body);
        const savedProducto = await productoData.save();
        res.status(201).json(savedProducto);
    } catch (error) {
        console.log("Error al conectar a MongoDB:", error);
        res.status(500).json({ error: "Ocurrió un error en el servidor." });
    }
};

export const fetch = async (req, res) => {
    try {
        const productos = await Producto.find(); // Corregido: `Producto.find()` en lugar de `Productos.find()`
        if (productos.length === 0) {
            return res.status(404).json({ message: "No hay productos registrados." });
        }
        res.status(200).json(productos);
    } catch (error) {
        console.log("Error al conectar a MongoDB:", error);
        res.status(500).json({ error: "Ocurrió un error en el servidor." });
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const productoExist = await Producto.findById(id); // Corregido: `Producto.findById(id)`

        if (!productoExist) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }

        const updatedProducto = await Producto.findByIdAndUpdate(id, req.body, { 
            new: true 
        });

        res.status(200).json(updatedProducto);
    } catch (error) {
        console.log("Error en actualización:", error);
        res.status(500).json({ error: "Ocurrió un error en el servidor." });
    }
};

export const deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const productoExist = await Producto.findById(id); // Corregido: `Producto.findById(id)`

        if (!productoExist) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }

        await Producto.findByIdAndDelete(id);
        res.status(200).json({ message: "Producto eliminado correctamente." });
    } catch (error) {
        console.log("Error en eliminación:", error);
        res.status(500).json({ error: "Ocurrió un error en el servidor." });
    }
};

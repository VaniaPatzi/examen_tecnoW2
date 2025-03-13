import Usuario from "../model/usuariosModel.js";

export const create = async (req, res) => {
    try {
        const usuarioData = new Usuario(req.body);
        
        const savedUsuario = await usuarioData.save();
        res.status(201).json(savedUsuario);
    } catch (error) {
        console.log("Error al conectar a MongoDB: ", error);
        res.status(500).json({ error: "Ocurrió un error en el servidor." });
    }
}
export const fetch = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        if (usuarios.length === 0) {
            return res.status(404).json({ message: "No hay usuarios registrados." });
        }
        res.status(200).json(usuarios);
    } catch (error) {
        console.log("Error al conectar a MongoDB: ", error);
        res.status(500).json({ error: "Ocurrió un error en el servidor." });
    
    }
};

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const usuarioExist= await Usuario.findById({ _id: id });
        if (!usuarioExist) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }
        const updatedUsuario = await Usuario.findByIdAndUpdate(id, req.body, { 
            new: true 
        });
        res.status(201).json(updatedUsuario);
    } catch (error) {
        res.status(500).json({ error: "Ocurrió un error en el servidor." });
    }
};

export const deleteUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const usuarioExist = await Usuario.findById({ _id: id });
        if (!usuarioExist) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }
        await Usuario.findByIdAndDelete(id);
        res.status(201).json({ message: "Usuario eliminado." });
    } catch (error) {
        res.status(500).json({ error: "Ocurrió un error en el servidor." });
    }
}
export const fetch = async (req, res) => {
    try {
        return res.json("Hola desde el controlador de usuarios");
    } catch (error) {
        console.log("Error al conectar a MongoDB: ", error);
        res.status(500).json({ error: "Ocurrió un error en el servidor." });
    
    }
};
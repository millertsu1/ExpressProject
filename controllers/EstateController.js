/* const estateSchema = require('../models/Estate');
const { validationResult } = require('express-validator');

// Función para generar un código único
async function generarCodigo() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const codigo = Array.from({ length: 4 }, () => letras.charAt(Math.floor(Math.random() * letras.length))).join('') +
                   Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('');
    const codigoExistente = await estateSchema.findOne({ code: codigo });
    return codigoExistente ? generarCodigo() : codigo;
}

// Función para crear una nueva casa
exports.createHouse = async (req, res) => {
    const { errors } = validationResult(req);
    !errors.isEmpty() ? res.status(400).json({ errors: errors.array() }) : null;

    try {
        const { address, type, state, city } = req.body;
        const casaExistente = await estateSchema.findOne({ address });
        casaExistente ? res.status(400).json({ message: 'La casa ya existe.' }) : null;

        const codigo = await generarCodigo();
        const allowedTypes = ['house', 'apartment'];
        if (!allowedTypes.includes(type)) {
            return res.status(400).json({ message: 'Tipo de propiedad no válido. Debe ser "house" o "apartment".' });
        }

        const departamento = state.toLowerCase();
        const ciudad = city.toLowerCase();        
        const ciudadesDepartamento = ciudadesPorDepartamento[departamento];
        if (!ciudadesDepartamento || !ciudadesDepartamento.includes(ciudad)) {
            return res.status(400).json({ message: 'La ciudad no pertenece al departamento especificado.' });
        }

        const house = new estateSchema({ ...req.body, code: codigo });
        const savedHouse = await house.save();
        res.status(200).json(savedHouse);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al crear la casa");
    }
};

// Función para obtener todas las casas
exports.getHouses = async (req, res) => {
    try {
        const houses = await estateSchema.find();
        res.status(200).json(houses);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener las casas");
    }
};

// Función para obtener una casa por código
exports.getHouseByCodigo = async (req, res) => {
    try {
        const house = await estateSchema.findOne({ code: req.params.codigo });
        !house ? res.status(404).json({ message: "No existe la casa con ese código" }) : res.status(200).json(house);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener la casa");
    }
};

// Función para actualizar una casa por código
exports.updateHouseByCodigo = async (req, res) => {
    const { type, state, city } = req.body;
    const allowedTypes = ['house', 'apartment'];
    if (!allowedTypes.includes(type)) {
        return res.status(400).json({ message: 'Tipo de propiedad no válido. Debe ser "house" o "apartment".' });
    }
    const departamento = state.toLowerCase();
    const ciudad = city.toLowerCase();
    const ciudadesDepartamento = ciudadesPorDepartamento[departamento];
    if (!ciudadesDepartamento || !ciudadesDepartamento.includes(ciudad)) {
        return res.status(400).json({ message: 'La ciudad no pertenece al departamento especificado.' });
    }

    try {
        const house = await estateSchema.findOneAndUpdate({ code: req.params.codigo }, req.body, { new: true });
        !house ? res.status(404).json({ message: "No existe la casa con ese código" }) : res.status(200).json(house);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al actualizar la casa");
    }
};

// Función para eliminar una casa por código
exports.deleteHouseByCodigo = async (req, res) => {
    try {
        const house = await estateSchema.findOneAndDelete({ code: req.params.codigo });
        !house ? res.status(404).json({ message: "No existe la casa con ese código" }) : res.status(200).json(house);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al eliminar la casa");
    }
};

// Función para subir una imagen de la casa
exports.upload = async (req, res) => {
    !req.file ? res.status(400).send({ message: "No file uploaded" }) : null;

    try {
        const house = await estateSchema.findOne({ code: req.params.codigo });
        if (!house) {
            return res.status(404).json({ message: "No existe la casa con ese código" });
        }
        house.image = req.file.path;
        await house.save(); // Guarda los cambios de la casa
        res.status(200).json(house);
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        res.status(500).send("Error al procesar la solicitud");
    }
}; */
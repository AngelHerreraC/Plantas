"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class PlantService {
    createPlant(req, res) {
        try {
            const newPlant = req.body;
            const dataFilePath = path_1.default.join(__dirname, '../data.json');
            console.log('Creando planta:', newPlant);
            let dataPlants = [];
            if (fs_1.default.existsSync(dataFilePath)) {
                console.log("El archivo existe");
                const dataFileContent = fs_1.default.readFileSync(dataFilePath, 'utf-8');
                dataPlants = JSON.parse(dataFileContent);
            }
            dataPlants.push(newPlant);
            fs_1.default.writeFileSync(dataFilePath, JSON.stringify(dataPlants, null, 2));
            res.status(201).json({ mensaje: 'Planta Añadida' });
        }
        catch (err) {
            console.error(err);
            console.log("El archivo no existe");
        }
    }
    getPlants(_req, res) {
        try {
            const dataFilePath = path_1.default.join(__dirname, '../data.json');
            if (fs_1.default.existsSync(dataFilePath)) {
                const dataFileContent = fs_1.default.readFileSync(dataFilePath, 'utf-8');
                res.status(200).json(JSON.parse(dataFileContent));
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.default = PlantService;

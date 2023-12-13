"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const plantsroutes_1 = __importDefault(require("./routes/plantsroutes"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.static(path_1.default.join(__dirname, 'build')));
app.use(express_1.default.static(path_1.default.join(__dirname, 'register')));
app.use(express_1.default.static(path_1.default.join(__dirname, 'weather')));
app.use(express_1.default.static(path_1.default.join(__dirname, 'viewPlants')));
app.use(express_1.default.static(path_1.default.join(__dirname, 'main')));
app.use(express_1.default.json());
// app.use(express.static(path.join(__dirname, 'register')))
// app.get('/register', (_req ,res) => {
//     res.sendFile(path.join(__dirname,'register', 'register.html'));
//   });
app.get('/register', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'register', 'register.html'));
});
app.get('/weather', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'weather', 'weather.html'));
});
app.get('/plants', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'viewPlants', 'plants.html'));
});
app.get('/main', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'main', 'main.html'));
});
app.use('/api/plantas', plantsroutes_1.default);
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});

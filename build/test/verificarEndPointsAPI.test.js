"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require('supertest');
const index_1 = __importDefault(require("../Sources/index")); // Ajusta la ruta según la estructura de tu proyecto
describe('Probando los endpoints de la API Plants, tanto get como post', () => {
    test('GET / devuelve un cuerpo con el mensaje esperado', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(index_1.default).get('/api/plantas');
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        response.body.forEach((e) => {
            expect(e).toEqual({
                nombre: expect.any(String),
                fecha: expect.any(String),
                origen: expect.any(String),
                'tipo-planta': expect.any(String),
                podar: (e === null || e === void 0 ? void 0 : e.hasOwnProperty("podar")) ? expect.any(String) : undefined,
                'frec-podar': (e === null || e === void 0 ? void 0 : e.hasOwnProperty("frec-podar")) ? expect.any(String) : undefined,
                regar: (e === null || e === void 0 ? void 0 : e.hasOwnProperty("regar")) ? expect.any(String) : undefined,
                "frec-regar": (e === null || e === void 0 ? void 0 : e.hasOwnProperty("frec-regar")) ? expect.any(String) : undefined,
                fertilizar: (e === null || e === void 0 ? void 0 : e.hasOwnProperty("fertilizar")) ? expect.any(String) : undefined,
                'frec-fertilizar': (e === null || e === void 0 ? void 0 : e.hasOwnProperty("frec-fertilizar")) ? expect.any(String) : undefined,
                'tipo-clima': expect.any(String),
                'notas-especiales': expect.any(String),
            });
        });
    }));
    test('POST / envia una respuesta exitosa con el caso de mandando campos vacios en campos opcionales', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(index_1.default)
            .post('/api/plantas')
            .send({
            nombre: "Adalberto",
            fecha: "2023-12-12",
            origen: "awd",
            "tipo-planta": "arbusto",
            podar: "on",
            "frec-podar": "2",
            "frec-regar": "",
            "frec-fertilizar": "",
            "tipo-clima": "humedo",
            "notas-especiales": ""
        });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('mensaje', 'Planta Añadida');
    }));
    test('POST / envia una respuesta exitosa con el caso de mandando todos los campos', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(index_1.default)
            .post('/api/plantas')
            .send({
            "nombre": "Adalberto",
            "fecha": "2023-12-12",
            "origen": "Mexico",
            "tipo-planta": "arbusto",
            "podar": "on",
            "frec-podar": "2",
            "regar": "on",
            "frec-regar": "2",
            "fertilizar": "on",
            "frec-fertilizar": "2",
            "tipo-clima": "humedo",
            "notas-especiales": "ada"
        });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('mensaje', 'Planta Añadida');
    }));
});

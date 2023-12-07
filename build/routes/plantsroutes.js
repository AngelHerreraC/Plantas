"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RegistroService_1 = __importDefault(require("../services/RegistroService"));
const planService = new RegistroService_1.default();
const router = express_1.default.Router();
router.post('/', planService.createPlant);
router.get('/', planService.getPlants);
exports.default = router;

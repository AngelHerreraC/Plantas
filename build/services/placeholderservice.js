"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addData = exports.getData = void 0;
const placeholder_json_1 = __importDefault(require("./placeholder.json"));
const getData = () => placeholder_json_1.default;
exports.getData = getData;
const addData = () => null;
exports.addData = addData;

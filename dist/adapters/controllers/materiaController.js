"use strict";
// src/adapters/controllers/duendesController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMateriaById = exports.updateMateria = exports.getAllMateriaes = exports.getMateriaById = exports.createMateria = void 0;
const materiaService_1 = require("../../application/services/materiaService"); // Verifica la importación aquí
const createMateria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    try {
        const materia = yield materiaService_1.MateriaService.createMateria(name, description);
        res.status(201).json(materia);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createMateria = createMateria;
const getMateriaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const materia = yield materiaService_1.MateriaService.getMateriaById(id);
        if (!materia) {
            res.status(404).json({ message: 'materia not found' });
        }
        else {
            res.status(200).json(materia);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getMateriaById = getMateriaById;
const getAllMateriaes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const duendeses = yield materiaService_1.MateriaService.getAllMateriaes();
        res.status(200).json(duendeses);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllMateriaes = getAllMateriaes;
const updateMateria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const updatedMateria = yield materiaService_1.MateriaService.updateMateria(id, name, description);
        res.status(200).json(updatedMateria);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateMateria = updateMateria;
const deleteMateriaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield materiaService_1.MateriaService.deleteMateriaById(id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteMateriaById = deleteMateriaById;

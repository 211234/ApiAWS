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
exports.deleteDuendesById = exports.updateDuendes = exports.getAllDuendeses = exports.getDuendesById = exports.createDuendes = void 0;
const duendesService_1 = require("../../application/services/duendesService"); // Verifica la importación aquí
const createDuendes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    try {
        const duendes = yield duendesService_1.DuendesService.createDuendes(name, description);
        res.status(201).json(duendes);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createDuendes = createDuendes;
const getDuendesById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const duendes = yield duendesService_1.DuendesService.getDuendesById(id);
        if (!duendes) {
            res.status(404).json({ message: 'Duendes not found' });
        }
        else {
            res.status(200).json(duendes);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getDuendesById = getDuendesById;
const getAllDuendeses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const duendeses = yield duendesService_1.DuendesService.getAllDuendeses();
        res.status(200).json(duendeses);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllDuendeses = getAllDuendeses;
const updateDuendes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const updatedDuendes = yield duendesService_1.DuendesService.updateDuendes(id, name, description);
        res.status(200).json(updatedDuendes);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateDuendes = updateDuendes;
const deleteDuendesById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield duendesService_1.DuendesService.deleteDuendesById(id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteDuendesById = deleteDuendesById;

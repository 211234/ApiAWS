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
const materia_1 = __importDefault(require("../../domain/models/materia"));
const materiaSchema_1 = require("./schemas/materiaSchema");
class MongoMateriaRepository {
    save(materia) {
        return __awaiter(this, void 0, void 0, function* () {
            const materiaModel = new materiaSchema_1.MateriaModel(materia);
            const savedMateria = yield materiaModel.save();
            return new materia_1.default(savedMateria.id, savedMateria.name, savedMateria.description);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const materia = yield materiaSchema_1.MateriaModel.findById(id);
            if (!materia)
                return null;
            return new materia_1.default(materia.id, materia.name, materia.description);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const materia = yield materiaSchema_1.MateriaModel.find();
            return materia.map(materia => new materia_1.default(materia.id, materia.name, materia.description));
        });
    }
    update(materia) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedMateria = yield materiaSchema_1.MateriaModel.findByIdAndUpdate(materia.id, materia, { new: true });
            if (!updatedMateria)
                throw new Error('materia not found');
            return new materia_1.default(updatedMateria.id, updatedMateria.name, updatedMateria.description);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield materiaSchema_1.MateriaModel.findByIdAndDelete(id);
        });
    }
}
exports.default = MongoMateriaRepository;

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
exports.MateriaService = void 0;
const materia_1 = __importDefault(require("../../domain/models/materia"));
class MateriaService {
    constructor(duendesRepository) {
        MateriaService.duendesRepository = duendesRepository;
    }
    static createMateria(name, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const materia = new materia_1.default(null, name, description);
            return yield MateriaService.duendesRepository.save(materia);
        });
    }
    static getMateriaById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield MateriaService.duendesRepository.findById(id);
        });
    }
    static getAllMateriaes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield MateriaService.duendesRepository.findAll();
        });
    }
    static updateMateria(id, name, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const materia = new materia_1.default(id, name, description);
            return yield MateriaService.duendesRepository.update(materia);
        });
    }
    static deleteMateriaById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield MateriaService.duendesRepository.deleteById(id);
        });
    }
}
exports.MateriaService = MateriaService;

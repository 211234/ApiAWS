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
exports.DuendesService = void 0;
const duendes_1 = __importDefault(require("../../domain/models/duendes"));
class DuendesService {
    constructor(duendesRepository) {
        DuendesService.duendesRepository = duendesRepository;
    }
    static createDuendes(name, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const duendes = new duendes_1.default(null, name, description);
            return yield DuendesService.duendesRepository.save(duendes);
        });
    }
    static getDuendesById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DuendesService.duendesRepository.findById(id);
        });
    }
    static getAllDuendeses() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DuendesService.duendesRepository.findAll();
        });
    }
    static updateDuendes(id, name, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const duendes = new duendes_1.default(id, name, description);
            return yield DuendesService.duendesRepository.update(duendes);
        });
    }
    static deleteDuendesById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield DuendesService.duendesRepository.deleteById(id);
        });
    }
}
exports.DuendesService = DuendesService;

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
const duendes_1 = __importDefault(require("../../domain/models/duendes"));
const duendesSchema_1 = require("./schemas/duendesSchema");
class MongoDuendesRepository {
    save(duendes) {
        return __awaiter(this, void 0, void 0, function* () {
            const duendesModel = new duendesSchema_1.DuendesModel(duendes);
            const savedDuendes = yield duendesModel.save();
            return new duendes_1.default(savedDuendes.id, savedDuendes.name, savedDuendes.description);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const duendes = yield duendesSchema_1.DuendesModel.findById(id);
            if (!duendes)
                return null;
            return new duendes_1.default(duendes.id, duendes.name, duendes.description);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const duendeses = yield duendesSchema_1.DuendesModel.find();
            return duendeses.map(duendes => new duendes_1.default(duendes.id, duendes.name, duendes.description));
        });
    }
    update(duendes) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedDuendes = yield duendesSchema_1.DuendesModel.findByIdAndUpdate(duendes.id, duendes, { new: true });
            if (!updatedDuendes)
                throw new Error('Duendes not found');
            return new duendes_1.default(updatedDuendes.id, updatedDuendes.name, updatedDuendes.description);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield duendesSchema_1.DuendesModel.findByIdAndDelete(id);
        });
    }
}
exports.default = MongoDuendesRepository;

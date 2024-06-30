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
const mysqlConnection_1 = __importDefault(require("../../infrastructure/database/mysqlConnection"));
class MySQLDuendesRepository {
    save(duendes) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, mysqlConnection_1.default)();
            const [result] = yield connection.execute('INSERT INTO duendeses (name, description) VALUES (?, ?)', [duendes.name, duendes.description]);
            duendes.id = result.insertId.toString();
            return duendes;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, mysqlConnection_1.default)();
            const [rows] = yield connection.execute('SELECT * FROM duendeses WHERE id = ?', [id]);
            if (rows.length === 0)
                return null;
            const row = rows[0];
            return new duendes_1.default(row.id.toString(), row.name, row.description);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, mysqlConnection_1.default)();
            const [rows] = yield connection.execute('SELECT * FROM duendeses');
            return rows.map(row => new duendes_1.default(row.id.toString(), row.name, row.description));
        });
    }
    update(duendes) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, mysqlConnection_1.default)();
            yield connection.execute('UPDATE duendeses SET name = ?, description = ? WHERE id = ?', [duendes.name, duendes.description, duendes.id]);
            return duendes;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, mysqlConnection_1.default)();
            yield connection.execute('DELETE FROM duendeses WHERE id = ?', [id]);
        });
    }
}
exports.default = MySQLDuendesRepository;

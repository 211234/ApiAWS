"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageRepository = exports.materiaService = exports.alumnoService = void 0;
const mongoAlumnoRepository_1 = __importDefault(require("../adapters/repositories/mongoAlumnoRepository"));
const mysqlAlumnoRepository_1 = __importDefault(require("../adapters/repositories/mysqlAlumnoRepository"));
const alumnoService_1 = require("../application/services/alumnoService");
const mongoConnection_1 = __importDefault(require("./database/mongoConnection"));
const mysqlConnection_1 = __importDefault(require("./database/mysqlConnection"));
const s3StorageRepository_1 = require("../adapters/repositories/s3StorageRepository");
const localStorageRepository_1 = require("../adapters/repositories/localStorageRepository");
const mongoMateriaRepository_1 = __importDefault(require("../adapters/repositories/mongoMateriaRepository"));
const mysqlMateriaRepository_1 = __importDefault(require("../adapters/repositories/mysqlMateriaRepository"));
const materiaService_1 = require("../application/services/materiaService");
const useMongoDB = process.env.USE_MONGODB === 'true';
const useS3 = process.env.USE_S3 === 'true';
let alumnoRepository;
let materiaRepository;
if (useMongoDB) {
    (0, mongoConnection_1.default)();
    alumnoRepository = new mongoAlumnoRepository_1.default();
    materiaRepository = new mongoMateriaRepository_1.default();
}
else {
    (0, mysqlConnection_1.default)();
    alumnoRepository = new mysqlAlumnoRepository_1.default();
    materiaRepository = new mysqlMateriaRepository_1.default();
}
let storageRepository;
if (useS3) {
    exports.storageRepository = storageRepository = new s3StorageRepository_1.S3StorageRepository();
}
else {
    exports.storageRepository = storageRepository = new localStorageRepository_1.LocalStorageRepository();
}
const alumnoService = new alumnoService_1.AlumnoService(alumnoRepository);
exports.alumnoService = alumnoService;
const materiaService = new materiaService_1.MateriaService(materiaRepository);
exports.materiaService = materiaService;

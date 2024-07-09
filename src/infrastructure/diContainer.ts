import { IAlumnoRepository } from '../domain/repositories/IAlumnoRepository';
import MongoAlumnoRepository from '../adapters/repositories/mongoAlumnoRepository';
import MySQLAlumnoRepository from '../adapters/repositories/mysqlAlumnoRepository';
import { AlumnoService } from '../application/services/alumnoService';
import connectMongoDB from './database/mongoConnection';
import connectMySQL from './database/mysqlConnection';
import { S3StorageRepository } from '../adapters/repositories/s3StorageRepository';
import { LocalStorageRepository } from '../adapters/repositories/localStorageRepository';
import { IStorageRepository } from '../domain/repositories/IStorageRepository';
import { IMateriaRepository } from '../domain/repositories/IMateriaRepository';
import MongoMateriaRepository from '../adapters/repositories/mongoMateriaRepository';
import MySQLMateriaRepository from '../adapters/repositories/mysqlMateriaRepository';
import { MateriaService } from '../application/services/materiaService';

const useMongoDB: boolean = process.env.USE_MONGODB === 'true';
const useS3: boolean = process.env.USE_S3 === 'true';

let alumnoRepository: IAlumnoRepository;
let materiaRepository: IMateriaRepository;

if (useMongoDB) {
    connectMongoDB();
    alumnoRepository = new MongoAlumnoRepository();
    materiaRepository = new MongoMateriaRepository();
} else {
    connectMySQL();
    alumnoRepository = new MySQLAlumnoRepository();
    materiaRepository = new MySQLMateriaRepository();
}

let storageRepository: IStorageRepository;

if (useS3) {
    storageRepository = new S3StorageRepository();
} else {
    storageRepository = new LocalStorageRepository();
}

const alumnoService = new AlumnoService(alumnoRepository);
const materiaService = new MateriaService(materiaRepository);

export { alumnoService, materiaService, storageRepository };

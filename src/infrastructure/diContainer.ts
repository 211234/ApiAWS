import { IAlumnoRepository } from '../domain/repositories/IAlumnoRepository';
import MongoAlumnoRepository from '../adapters/repositories/mongoAlumnoRepository';
import MySQLAlumnoRepository from '../adapters/repositories/mysqlAlumnoRepository';
import { AlumnoService } from '../application/services/alumnoService';
import connectMongoDB from './database/mongoConnection';
import connectMySQL from './database/mysqlConnection';
import { S3StorageRepository } from '../adapters/repositories/s3StorageRepository';
import { LocalStorageRepository } from '../adapters/repositories/localStorageRepository';
import { IStorageRepository } from '../domain/repositories/IStorageRepository';
import { IDuendesRepository } from '../domain/repositories/IDuendesRepository';
import MongoDuendesRepository from '../adapters/repositories/mongoDuendesRepository';
import MySQLDuendesRepository from '../adapters/repositories/mysqlDuendesRepository';
import { DuendesService } from '../application/services/duendesService';

const useMongoDB: boolean = process.env.USE_MONGODB === 'true';
const useS3: boolean = process.env.USE_S3 === 'true';

let alumnoRepository: IAlumnoRepository;
let duendesRepository: IDuendesRepository;

if (useMongoDB) {
    connectMongoDB();
    alumnoRepository = new MongoAlumnoRepository();
    duendesRepository = new MongoDuendesRepository();
} else {
    connectMySQL();
    alumnoRepository = new MySQLAlumnoRepository();
    duendesRepository = new MySQLDuendesRepository();
}

let storageRepository: IStorageRepository;

if (useS3) {
    storageRepository = new S3StorageRepository();
} else {
    storageRepository = new LocalStorageRepository();
}

const alumnoService = new AlumnoService(alumnoRepository);
const duendesService = new DuendesService(duendesRepository);

export { alumnoService, duendesService, storageRepository };

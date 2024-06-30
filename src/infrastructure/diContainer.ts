import { IAlumnoRepository } from '../domain/repositories/IAlumnoRepository';
import MongoAlumnoRepository from '../adapters/repositories/mongoAlumnoRepository';
import MySQLAlumnoRepository from '../adapters/repositories/mysqlAlumnoRepository';
import { AlumnoService } from '../application/services/alumnoService';
import connectMongoDB from './database/mongoConnection';
import connectMySQL from './database/mysqlConnection';
import { S3StorageRepository } from '../adapters/repositories/s3StorageRepository';
import { LocalStorageRepository } from '../adapters/repositories/localStorageRepository';
import { IStorageRepository } from '../domain/repositories/IStorageRepository';
import { IBusinessRepository } from '../domain/repositories/IBusinessRepository';
import MongoBusinessRepository from '../adapters/repositories/mongoBusinessRepository';
import MySQLBusinessRepository from '../adapters/repositories/mysqlBusinessRepository';
import { BusinessService } from '../application/services/businessService';

const useMongoDB: boolean = process.env.USE_MONGODB === 'true';
const useS3: boolean = process.env.USE_S3 === 'true';

let alumnoRepository: IAlumnoRepository;
let businessRepository: IBusinessRepository;

if (useMongoDB) {
    connectMongoDB();
    alumnoRepository = new MongoAlumnoRepository();
    businessRepository = new MongoBusinessRepository();
} else {
    connectMySQL();
    alumnoRepository = new MySQLAlumnoRepository();
    businessRepository = new MySQLBusinessRepository();
}

let storageRepository: IStorageRepository;

if (useS3) {
    storageRepository = new S3StorageRepository();
} else {
    storageRepository = new LocalStorageRepository();
}

const alumnoService = new AlumnoService(alumnoRepository);
const businessService = new BusinessService(businessRepository);

export { alumnoService, businessService, storageRepository };

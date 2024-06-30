import express from 'express';
import { createAlumno, getAlumnoById, getAllAlumnos, updateAlumno, deleteAlumnoById } from '../../adapters/controllers/alumnoController';
import { createDuendes, getDuendesById, getAllDuendeses, updateDuendes, deleteDuendesById } from '../../adapters/controllers/duendesController'; 
import { upload } from '../../infrastructure/config/multerConfig';
import { StorageController } from '../../adapters/controllers/storageController';
import { storageRepository } from '../../infrastructure/diContainer';
import { StorageService } from '../../application/services/storageService';
import { DuendesService } from '../../application/services/duendesService'; 
import { duendesService } from '../../infrastructure/diContainer'; 

const app = express();
app.use(express.json());

const storageService = new StorageService(storageRepository);
const storageController = new StorageController(storageService);

app.post('/upload', upload.single('file'), storageController.upload);
app.post('/api/alumnos', createAlumno);
app.get('/api/alumnos/:id', getAlumnoById);
app.get('/api/alumnos', getAllAlumnos);
app.put('/api/alumnos/:id', updateAlumno);
app.delete('/api/alumnos/:id', deleteAlumnoById);

app.post('/api/duendeses', createDuendes); 
app.get('/api/duendeses/:id', getDuendesById); 
app.get('/api/duendeses', getAllDuendeses); 
app.put('/api/duendeses/:id', updateDuendes); 
app.delete('/api/duendeses/:id', deleteDuendesById); 

export default app;

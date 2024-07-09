import express from 'express';
import { createAlumno, getAlumnoById, getAllAlumnos, updateAlumno, deleteAlumnoById } from '../../adapters/controllers/alumnoController';
import { createMateria, getMateriaById, getAllMateriaes, updateMateria, deleteMateriaById } from '../../adapters/controllers/materiaController'; 
import { upload } from '../../infrastructure/config/multerConfig';
import { StorageController } from '../../adapters/controllers/storageController';
import { storageRepository } from '../../infrastructure/diContainer';
import { StorageService } from '../../application/services/storageService';
import { MateriaService } from '../../application/services/materiaService';
import { materiaService } from '../../infrastructure/diContainer'; 

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

app.post('/api/materia', createMateria); 
app.get('/api/materia/:id', getMateriaById); 
app.get('/api/materia', getAllMateriaes); 
app.put('/api/materia/:id', updateMateria); 
app.delete('/api/materia/:id', deleteMateriaById); 

export default app;

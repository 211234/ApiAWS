import materia from '../models/materia';

export interface IMateriaRepository {
    save(materia: materia): Promise<materia>;
    findById(id: string): Promise<materia | null>;
    findAll(): Promise<materia[]>;
    update(materia: materia): Promise<materia>;
    deleteById(id: string): Promise<void>;
}

import { IMateriaRepository } from '../../domain/repositories/IMateriaRepository';
import Materia from '../../domain/models/materia';

export class MateriaService {
    private static materiaRepository: IMateriaRepository;

    constructor(materiaRepository: IMateriaRepository) {
        MateriaService.materiaRepository = materiaRepository;
    }

    static async createMateria(name: string, description: string): Promise<Materia> {
        const materia = new Materia(null, name, description);
        return await MateriaService.materiaRepository.save(materia);
    }

    static async getMateriaById(id: string): Promise<Materia | null> {
        return await MateriaService.materiaRepository.findById(id);
    }

    static async getAllMateriaes(): Promise<Materia[]> {
        return await MateriaService.materiaRepository.findAll();
    }

    static async updateMateria(id: string, name: string, description: string): Promise<Materia> {
        const materia = new Materia(id, name, description);
        return await MateriaService.materiaRepository.update(materia);
    }

    static async deleteMateriaById(id: string): Promise<void> {
        await MateriaService.materiaRepository.deleteById(id);
    }
}

import { IMateriaRepository } from '../../domain/repositories/IMateriaRepository';
import Materia from '../../domain/models/materia';

export class MateriaService {
    private static duendesRepository: IMateriaRepository;

    constructor(duendesRepository: IMateriaRepository) {
        MateriaService.duendesRepository = duendesRepository;
    }

    static async createMateria(name: string, description: string): Promise<Materia> {
        const materia = new Materia(null, name, description);
        return await MateriaService.duendesRepository.save(materia);
    }

    static async getMateriaById(id: string): Promise<Materia | null> {
        return await MateriaService.duendesRepository.findById(id);
    }

    static async getAllMateriaes(): Promise<Materia[]> {
        return await MateriaService.duendesRepository.findAll();
    }

    static async updateMateria(id: string, name: string, description: string): Promise<Materia> {
        const materia = new Materia(id, name, description);
        return await MateriaService.duendesRepository.update(materia);
    }

    static async deleteMateriaById(id: string): Promise<void> {
        await MateriaService.duendesRepository.deleteById(id);
    }
}

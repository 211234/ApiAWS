import { IDuendesRepository } from '../../domain/repositories/IDuendesRepository';
import Duendes from '../../domain/models/duendes';

export class DuendesService {
    private static duendesRepository: IDuendesRepository;

    constructor(duendesRepository: IDuendesRepository) {
        DuendesService.duendesRepository = duendesRepository;
    }

    static async createDuendes(name: string, description: string): Promise<Duendes> {
        const duendes = new Duendes(null, name, description);
        return await DuendesService.duendesRepository.save(duendes);
    }

    static async getDuendesById(id: string): Promise<Duendes | null> {
        return await DuendesService.duendesRepository.findById(id);
    }

    static async getAllDuendeses(): Promise<Duendes[]> {
        return await DuendesService.duendesRepository.findAll();
    }

    static async updateDuendes(id: string, name: string, description: string): Promise<Duendes> {
        const duendes = new Duendes(id, name, description);
        return await DuendesService.duendesRepository.update(duendes);
    }

    static async deleteDuendesById(id: string): Promise<void> {
        await DuendesService.duendesRepository.deleteById(id);
    }
}

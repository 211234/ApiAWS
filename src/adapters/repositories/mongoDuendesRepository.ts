import { IDuendesRepository } from '../../domain/repositories/IDuendesRepository';
import Duendes from '../../domain/models/duendes';
import { IDuendesDocument, DuendesModel } from './schemas/duendesSchema';

class MongoDuendesRepository implements IDuendesRepository {
    async save(duendes: Duendes): Promise<Duendes> {
        const duendesModel = new DuendesModel(duendes);
        const savedDuendes = await duendesModel.save();
        return new Duendes(savedDuendes.id, savedDuendes.name, savedDuendes.description);
    }

    async findById(id: string): Promise<Duendes | null> {
        const duendes = await DuendesModel.findById(id);
        if (!duendes) return null;
        return new Duendes(duendes.id, duendes.name, duendes.description);
    }

    async findAll(): Promise<Duendes[]> {
        const duendeses: IDuendesDocument[] = await DuendesModel.find();
        return duendeses.map(duendes => new Duendes(duendes.id, duendes.name, duendes.description));
    }

    async update(duendes: Duendes): Promise<Duendes> {
        const updatedDuendes = await DuendesModel.findByIdAndUpdate(duendes.id, duendes, { new: true });
        if (!updatedDuendes) throw new Error('Duendes not found');
        return new Duendes(updatedDuendes.id, updatedDuendes.name, updatedDuendes.description);
    }

    async deleteById(id: string): Promise<void> {
        await DuendesModel.findByIdAndDelete(id);
    }
}

export default MongoDuendesRepository;

import { IMateriaRepository } from '../../domain/repositories/IMateriaRepository';
import Materia from '../../domain/models/materia';
import { IMateriaDocument, MateriaModel } from './schemas/materiaSchema';

class MongoMateriaRepository implements IMateriaRepository {
    async save(materia: Materia): Promise<Materia> {
        const materiaModel = new MateriaModel(materia);
        const savedMateria = await materiaModel.save();
        return new Materia(savedMateria.id, savedMateria.name, savedMateria.description);
    }

    async findById(id: string): Promise<Materia | null> {
        const materia = await MateriaModel.findById(id);
        if (!materia) return null;
        return new Materia(materia.id, materia.name, materia.description);
    }

    async findAll(): Promise<Materia[]> {
        const materia: IMateriaDocument[] = await MateriaModel.find();
        return materia.map(materia => new Materia(materia.id, materia.name, materia.description));
    }

    async update(materia: Materia): Promise<Materia> {
        const updatedMateria = await MateriaModel.findByIdAndUpdate(materia.id, materia, { new: true });
        if (!updatedMateria) throw new Error('materia not found');
        return new Materia(updatedMateria.id, updatedMateria.name, updatedMateria.description);
    }

    async deleteById(id: string): Promise<void> {
        await MateriaModel.findByIdAndDelete(id);
    }
}

export default MongoMateriaRepository;

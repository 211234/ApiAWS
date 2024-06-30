import Duendes from '../models/duendes';

export interface IDuendesRepository {
    save(duendes: Duendes): Promise<Duendes>;
    findById(id: string): Promise<Duendes | null>;
    findAll(): Promise<Duendes[]>;
    update(duendes: Duendes): Promise<Duendes>;
    deleteById(id: string): Promise<void>;
}

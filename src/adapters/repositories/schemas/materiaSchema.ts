import mongoose, { Document, Schema } from 'mongoose';

export interface IMateriaDocument extends Document {
    name: string;
    description: string;
    // Puedes añadir más campos según sea necesario
}

const materiaSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    // Define más campos aquí si es necesario
});

export const MateriaModel = mongoose.model<IMateriaDocument>('materia', materiaSchema);

import mongoose, { Document, Schema } from 'mongoose';

export interface IDuendesDocument extends Document {
    name: string;
    description: string;
    // Puedes añadir más campos según sea necesario
}

const duendesSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    // Define más campos aquí si es necesario
});

export const DuendesModel = mongoose.model<IDuendesDocument>('Duendes', duendesSchema);

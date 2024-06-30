// src/adapters/controllers/duendesController.ts

import { Request, Response } from 'express';
import { DuendesService } from '../../application/services/duendesService'; // Verifica la importación aquí

export const createDuendes = async (req: Request, res: Response) => {
    const { name, description } = req.body;
    try {
        const duendes = await DuendesService.createDuendes(name, description);
        res.status(201).json(duendes);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getDuendesById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const duendes = await DuendesService.getDuendesById(id);
        if (!duendes) {
            res.status(404).json({ message: 'Duendes not found' });
        } else {
            res.status(200).json(duendes);
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllDuendeses = async (req: Request, res: Response) => {
    try {
        const duendeses = await DuendesService.getAllDuendeses();
        res.status(200).json(duendeses);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateDuendes = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const updatedDuendes = await DuendesService.updateDuendes(id, name, description);
        res.status(200).json(updatedDuendes);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteDuendesById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await DuendesService.deleteDuendesById(id);
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

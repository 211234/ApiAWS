// src/adapters/controllers/duendesController.ts

import { Request, Response } from 'express';
import { MateriaService } from '../../application/services/materiaService'; // Verifica la importación aquí

export const createMateria = async (req: Request, res: Response) => {
    const { name, description } = req.body;
    try {
        const materia = await MateriaService.createMateria(name, description);
        res.status(201).json(materia);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getMateriaById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const materia = await MateriaService.getMateriaById(id);
        if (!materia) {
            res.status(404).json({ message: 'materia not found' });
        } else {
            res.status(200).json(materia);
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllMateriaes = async (req: Request, res: Response) => {
    try {
        const duendeses = await MateriaService.getAllMateriaes();
        res.status(200).json(duendeses);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateMateria = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const updatedMateria = await MateriaService.updateMateria(id, name, description);
        res.status(200).json(updatedMateria);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteMateriaById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await MateriaService.deleteMateriaById(id);
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

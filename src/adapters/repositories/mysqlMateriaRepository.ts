import { IMateriaRepository } from '../../domain/repositories/IMateriaRepository';
import materia from '../../domain/models/materia';
import connectMySQL from '../../infrastructure/database/mysqlConnection';
import { RowDataPacket, OkPacket, FieldPacket } from 'mysql2';

class MySQLMateriaRepository implements IMateriaRepository {
    async save(materia: materia): Promise<materia> {
        const connection = await connectMySQL();
        const [result]: [OkPacket, FieldPacket[]] = await connection.execute(
            'INSERT INTO materias (name, description) VALUES (?, ?)',
            [materia.name, materia.description]
        );
        materia.id = result.insertId.toString();
        return materia;
    }

    async findById(id: string): Promise<materia | null> {
        const connection = await connectMySQL();
        const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.execute(
            'SELECT * FROM materias WHERE id = ?',
            [id]
        );
        if (rows.length === 0) return null;
        const row = rows[0];
        return new materia(row.id.toString(), row.name, row.description);
    }

    async findAll(): Promise<materia[]> {
        const connection = await connectMySQL();
        const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.execute('SELECT * FROM materias');
        return rows.map(row => new materia(row.id.toString(), row.name, row.description));
    }

    async update(materia: materia): Promise<materia> {
        const connection = await connectMySQL();
        await connection.execute(
            'UPDATE materias SET name = ?, description = ? WHERE id = ?',
            [materia.name, materia.description, materia.id]
        );
        return materia;
    }

    async deleteById(id: string): Promise<void> {
        const connection = await connectMySQL();
        await connection.execute('DELETE FROM materias WHERE id = ?', [id]);
    }
}

export default MySQLMateriaRepository;

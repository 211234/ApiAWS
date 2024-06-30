import { IDuendesRepository } from '../../domain/repositories/IDuendesRepository';
import Duendes from '../../domain/models/duendes';
import connectMySQL from '../../infrastructure/database/mysqlConnection';
import { RowDataPacket, OkPacket, FieldPacket } from 'mysql2';

class MySQLDuendesRepository implements IDuendesRepository {
    async save(duendes: Duendes): Promise<Duendes> {
        const connection = await connectMySQL();
        const [result]: [OkPacket, FieldPacket[]] = await connection.execute(
            'INSERT INTO duendeses (name, description) VALUES (?, ?)',
            [duendes.name, duendes.description]
        );
        duendes.id = result.insertId.toString();
        return duendes;
    }

    async findById(id: string): Promise<Duendes | null> {
        const connection = await connectMySQL();
        const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.execute(
            'SELECT * FROM duendeses WHERE id = ?',
            [id]
        );
        if (rows.length === 0) return null;
        const row = rows[0];
        return new Duendes(row.id.toString(), row.name, row.description);
    }

    async findAll(): Promise<Duendes[]> {
        const connection = await connectMySQL();
        const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.execute('SELECT * FROM duendeses');
        return rows.map(row => new Duendes(row.id.toString(), row.name, row.description));
    }

    async update(duendes: Duendes): Promise<Duendes> {
        const connection = await connectMySQL();
        await connection.execute(
            'UPDATE duendeses SET name = ?, description = ? WHERE id = ?',
            [duendes.name, duendes.description, duendes.id]
        );
        return duendes;
    }

    async deleteById(id: string): Promise<void> {
        const connection = await connectMySQL();
        await connection.execute('DELETE FROM duendeses WHERE id = ?', [id]);
    }
}

export default MySQLDuendesRepository;

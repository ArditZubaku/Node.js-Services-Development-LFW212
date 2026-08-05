import { Injectable } from '@nestjs/common';

interface BoatData {
    brand: string;
    color: string;
}

@Injectable()
export class BoatService {
    private db: Record<string, BoatData> = {
        '1': { brand: 'Chaparral', color: 'red' },
        '2': { brand: 'Chaparral', color: 'blue' }
    };

    async getBoat(id: string): Promise<BoatData> {
        return new Promise((resolve, reject) => {
            if (!this.db.hasOwnProperty(id)) {
                const err = new Error('not found');
                (err as any).code = 'E_NOT_FOUND';
                setImmediate(() => reject(err));
                return;
            }
            setImmediate(() => resolve(this.db[id]));
        });
    }

    async createBoat(data: BoatData): Promise<string> {
        return new Promise((resolve, reject) => {
            const id = this.generateId();
            if (this.db.hasOwnProperty(id)) {
                const err = new Error('resource exists');
                (err as any).code = 'E_RESOURCE_EXISTS';
                setImmediate(() => reject(err));
                return;
            }
            this.db[id] = data;
            setImmediate(() => resolve(id));
        });
    }

    private generateId(): string {
        const keys = Object.keys(this.db)
            .sort((a, b) => Number(a) - Number(b))
            .map(Number)
            .filter((n) => !isNaN(n));
        const lastId = keys.length > 0 ? keys[keys.length - 1] : 0;
        return (lastId + 1).toString();
    }
}

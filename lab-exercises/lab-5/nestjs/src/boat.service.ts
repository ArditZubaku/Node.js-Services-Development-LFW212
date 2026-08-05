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
}

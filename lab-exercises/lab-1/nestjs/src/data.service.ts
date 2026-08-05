import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { setTimeout as sleep } from 'node:timers/promises';

@Injectable()
export class DataService {
    async getData(): Promise<string> {
        await sleep(50);
        return randomBytes(10).toString('base64');
    }
}

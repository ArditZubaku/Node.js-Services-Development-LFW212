import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IpBlockingMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const clientIp = req.ip;

        if (clientIp === '211.133.33.113') {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

        next();
    }
}

import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IpBlockingMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const clientIp = req.socket.remoteAddress;

        if (clientIp === '111.34.55.211') {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

        next();
    }
}

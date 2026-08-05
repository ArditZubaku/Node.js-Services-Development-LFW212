import { Controller, All, Req, Res, Next } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ProxyService } from './proxy.service';

@Controller()
export class ProxyController {
    constructor(private readonly proxyService: ProxyService) { }

    @All('*')
    async proxyAll(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
        try {
            await this.proxyService.proxyRequest(req, res);
        } catch (error) {
            next(error);
        }
    }
}

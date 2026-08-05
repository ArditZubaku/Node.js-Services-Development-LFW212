import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { StreamService } from './stream.service';

@Controller()
export class DataController {
    constructor(private readonly streamService: StreamService) { }

    @Get('data')
    getData(@Res() res: Response) {
        const stream = this.streamService.getStream();
        stream.pipe(res);
    }
}

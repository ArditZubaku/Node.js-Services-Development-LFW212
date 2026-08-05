import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { DataService } from './data.service';

@Controller()
export class AppController {
    constructor(private readonly dataService: DataService) { }

    @Get()
    async getData(): Promise<string> {
        try {
            return await this.dataService.getData();
        } catch (error) {
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

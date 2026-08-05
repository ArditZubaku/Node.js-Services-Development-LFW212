import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ConsumerService } from './consumer.service';

@Controller()
export class ConsumerController {
    constructor(private readonly consumerService: ConsumerService) { }

    @Get(':id')
    async getCombinedData(@Param('id') id: string) {
        try {
            // Validate ID is a valid integer
            const numericId = parseInt(id, 10);
            if (isNaN(numericId)) {
                throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
            }

            const result = await this.consumerService.getCombinedData(numericId);
            return result;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

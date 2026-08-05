import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { BoatService } from './boat.service';

@Controller('boat')
export class BoatController {
    constructor(private readonly boatService: BoatService) { }

    @Get(':id')
    async getBoat(@Param('id') id: string) {
        try {
            const boat = await this.boatService.getBoat(id);
            return boat;
        } catch (error) {
            if (error.code === 'E_NOT_FOUND') {
                throw new HttpException('Boat not found', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

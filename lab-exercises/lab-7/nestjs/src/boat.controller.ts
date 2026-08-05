import { Controller, Get, Delete, Param, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
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

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteBoat(@Param('id') id: string) {
        try {
            await this.boatService.deleteBoat(id);
        } catch (error) {
            if (error.code === 'E_NOT_FOUND') {
                throw new HttpException('Boat not found', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

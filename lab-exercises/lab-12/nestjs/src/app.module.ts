import { Module } from '@nestjs/common';
import { BoatController } from './boat.controller';
import { BoatService } from './boat.service';

@Module({
    imports: [],
    controllers: [BoatController],
    providers: [BoatService],
})
export class AppModule { }

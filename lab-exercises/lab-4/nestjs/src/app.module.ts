import { Module } from '@nestjs/common';
import { DataController } from './data.controller';
import { StreamService } from './stream.service';

@Module({
    imports: [],
    controllers: [DataController],
    providers: [StreamService],
})
export class AppModule { }

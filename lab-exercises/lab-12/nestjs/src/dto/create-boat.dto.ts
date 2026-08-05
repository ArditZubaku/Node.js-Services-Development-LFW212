import { IsObject, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class BoatDataDto {
    @IsString()
    brand: string;

    @IsString()
    color: string;
}

export class CreateBoatDto {
    @IsObject()
    @ValidateNested()
    @Type(() => BoatDataDto)
    data: BoatDataDto;
}

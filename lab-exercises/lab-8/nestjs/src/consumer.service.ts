import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

interface BoatData {
    id: number;
    brand: number;
    color: string;
}

interface BrandData {
    id: number;
    name: string;
}

interface CombinedData {
    id: number;
    color: string;
    brand: string;
}

@Injectable()
export class ConsumerService {
    private readonly boatServicePort = process.env.BOAT_SERVICE_PORT;
    private readonly brandServicePort = process.env.BRAND_SERVICE_PORT;

    async getCombinedData(id: number): Promise<CombinedData> {
        try {
            // Fetch boat data
            const boatResponse: AxiosResponse<BoatData> = await axios.get(
                `http://localhost:${this.boatServicePort}/${id}`,
                { timeout: 1250 }
            );

            if (boatResponse.status !== 200) {
                throw new HttpException('Boat service error', HttpStatus.INTERNAL_SERVER_ERROR);
            }

            const boatData = boatResponse.data;

            // Fetch brand data using the brand ID from boat data
            const brandResponse: AxiosResponse<BrandData> = await axios.get(
                `http://localhost:${this.brandServicePort}/${boatData.brand}`,
                { timeout: 1250 }
            );

            if (brandResponse.status !== 200) {
                throw new HttpException('Brand service error', HttpStatus.INTERNAL_SERVER_ERROR);
            }

            const brandData = brandResponse.data;

            return {
                id: boatData.id,
                color: boatData.color,
                brand: brandData.name
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
                }
                if (error.response?.status >= 400 && error.response?.status < 500 && error.response?.status !== 404) {
                    throw new HttpException('Service error', HttpStatus.INTERNAL_SERVER_ERROR);
                }
                if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
                    throw new HttpException('Service unavailable', HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

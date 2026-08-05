import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    async getRoot(@Query('un') un: string | string[]) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    if (Array.isArray(un)) {
                        // If multiple un parameters, return 400 Bad Request
                        throw new HttpException(
                            "Bad Request: Multiple 'un' parameters not allowed",
                            HttpStatus.BAD_REQUEST
                        );
                    }

                    // Normal case: single parameter or no parameter
                    resolve((un || "").toUpperCase());
                } catch (error) {
                    reject(error);
                }
            }, 1000);
        });
    }
}

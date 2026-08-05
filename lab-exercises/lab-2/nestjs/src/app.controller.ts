import { Controller, Get, Post, HttpCode, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    @HttpCode(HttpStatus.OK)
    getRoot(): string {
        return '';
    }

    @Post()
    @HttpCode(HttpStatus.METHOD_NOT_ALLOWED)
    postRoot(): string {
        return '';
    }
}

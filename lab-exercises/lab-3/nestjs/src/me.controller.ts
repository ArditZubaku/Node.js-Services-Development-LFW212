import { Controller, Get, Render } from '@nestjs/common';

@Controller('me')
export class MeController {
    @Get()
    @Render('hello')
    getProfile() {
        return {
            greeting: 'Hello'
        };
    }
}

import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { IpBlockingMiddleware } from './ip-blocking.middleware';

@Module({
    imports: [],
    controllers: [AppController],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(IpBlockingMiddleware)
            .forRoutes('*');
    }
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Listen only on localhost (127.0.0.1)
    const HOST = '127.0.0.1';
    const PORT = 3000;

    await app.listen(PORT, HOST);
    console.log(`Server running at http://${HOST}:${PORT}/`);
}
bootstrap();

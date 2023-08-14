import { RolesGuard } from './auth/roles.guard';
import { ValidationPipe } from './pipes/validation.pipe';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  //swagger 
  const config = new DocumentBuilder()
    .setTitle('api for bas-system')
    .setDescription('documentation')
    .setVersion('0.0.1')
    .addTag('BAS API')
    .build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/swagger', app, document)
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`app started on ${PORT}`));
}
start();

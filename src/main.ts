import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { QueryFailedFilter } from './exceptions/query-failed.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new QueryFailedFilter());

  const config = new DocumentBuilder()
    .setTitle('Documentacion Ifudis-Marketplace')
    .setDescription(' API description')
    .setVersion('1.0')
    .addTag('auth')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();

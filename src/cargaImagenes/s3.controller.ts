import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { S3Service } from './s3.service';

@Controller('uploads')
@ApiTags('uploads') // Añadir un tag para la documentación Swagger
export class UploadsController {
  constructor(private readonly s3Service: S3Service) {}

  @Post('images')
  @UseInterceptors(FilesInterceptor('images', 5)) // Límite de 5 imágenes
  @ApiOperation({ summary: 'Subir hasta 5 imágenes a S3' })
  @ApiConsumes('multipart/form-data') // Especificamos que es una carga de archivos
  @ApiResponse({
    status: 200,
    description: 'Imágenes cargadas correctamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        imageUrls: {
          type: 'array',
          items: { type: 'string', format: 'uri' },
        },
      },
    },
  })
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    const imageUrls = [];

    for (const file of files) {
      const imageUrl = await this.s3Service.uploadFile(file);
      imageUrls.push(imageUrl);
    }

    return {
      message: 'Imágenes cargadas correctamente',
      imageUrls,
    };
  }
}

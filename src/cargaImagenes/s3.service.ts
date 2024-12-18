import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  private s3: AWS.S3;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get('AWS_REGION'),
    });
    this.bucketName = this.configService.get('AWS_BUCKET_NAME');
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const params = {
      Bucket: this.bucketName,
      Key: `${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read', // Esto permite que la imagen sea accesible públicamente
    };

    const uploadResult = await this.s3.upload(params).promise();
    return uploadResult.Location; // Retorna la URL pública de la imagen
  }
}

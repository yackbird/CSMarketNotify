import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from '@/app.service';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): { status: string; data: string } {
    return {
      status: 'success',
      data: this.appService.getHello()
    };
  }

  @Get('health')
  getHealth(): { status: string; data: string } {
    return {
      status: 'success',
      data: new Date().toISOString(),
    };
  }

  @Get('download/code')
  downloadCode(@Res() res: Response) {
    const filePath = path.join(process.cwd(), 'CSMarketNotify.tar.gz');
    const fileStream = fs.createReadStream(filePath);

    res.setHeader('Content-Type', 'application/gzip');
    res.setHeader('Content-Disposition', 'attachment; filename=CSMarketNotify.tar.gz');

    fileStream.pipe(res);

    fileStream.on('error', (error) => {
      console.error('文件下载失败:', error);
      res.status(500).send('文件下载失败');
    });
  }
}

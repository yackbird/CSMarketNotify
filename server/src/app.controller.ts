import { Controller, Get, Res, Header } from '@nestjs/common';
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
  @Header('Content-Type', 'application/gzip')
  @Header('Content-Disposition', 'attachment; filename=CSMarketNotify.tar.gz')
  downloadCode(@Res() res: Response) {
    try {
      // 修正路径：使用项目根目录
      const projectRoot = path.join(__dirname, '..', '..');
      const filePath = path.join(projectRoot, 'CSMarketNotify.tar.gz');

      console.log('项目根目录:', projectRoot);
      console.log('文件路径:', filePath);

      // 检查文件是否存在
      if (!fs.existsSync(filePath)) {
        console.error('文件不存在:', filePath);
        return res.status(404).send({
          status: 'error',
          message: '文件不存在'
        });
      }

      // 读取文件大小
      const stats = fs.statSync(filePath);
      console.log('文件大小:', stats.size);

      // 创建文件流
      const fileStream = fs.createReadStream(filePath);

      // 处理错误
      fileStream.on('error', (error) => {
        console.error('文件流错误:', error);
        if (!res.headersSent) {
          res.status(500).send({
            status: 'error',
            message: '文件下载失败'
          });
        }
      });

      // 管道传输
      fileStream.pipe(res);

    } catch (error) {
      console.error('下载错误:', error);
      if (!res.headersSent) {
        res.status(500).send({
          status: 'error',
          message: '服务器错误'
        });
      }
    }
  }
}

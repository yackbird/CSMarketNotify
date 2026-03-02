import { Controller, Get, Post, Body, Delete, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { CsService, CsItemPrice, ExchangeRate } from './cs.service';

@Controller('cs')
export class CsController {
  constructor(private readonly csService: CsService) {}

  /**
   * 获取真实货币汇率（演示外部 API 调用）
   * GET /api/cs/exchange-rates
   */
  @Get('exchange-rates')
  async getExchangeRates() {
    try {
      console.log('[CS Controller] 获取真实汇率数据');
      const rates = await this.csService.getRealExchangeRates();

      return {
        code: 200,
        msg: 'success',
        data: rates,
      };
    } catch (error) {
      console.error('[CS Controller] 获取汇率数据失败:', error);
      return {
        code: 500,
        msg: error.message || '获取汇率数据失败',
        data: [],
      };
    }
  }

  /**
   * 抓取 CS 道具价格数据
   * POST /api/cs/scrape
   */
  @Post('scrape')
  @HttpCode(HttpStatus.OK)
  async scrapePrices(): Promise<{ code: number; msg: string; data: { count: number; items: CsItemPrice[] } | null }> {
    try {
      console.log('[CS Controller] 开始抓取价格数据');
      const items = await this.csService.scrapeCsPrices();
      await this.csService.savePrices(items);
      console.log(`[CS Controller] 成功抓取并保存 ${items.length} 条价格记录`);

      return {
        code: 200,
        msg: 'success',
        data: {
          count: items.length,
          items,
        },
      };
    } catch (error) {
      console.error('[CS Controller] 抓取价格数据失败:', error);
      return {
        code: 500,
        msg: error.message || '抓取价格数据失败',
        data: null,
      };
    }
  }

  /**
   * 获取热门道具列表
   * GET /api/cs/hot-items
   */
  @Get('hot-items')
  async getHotItems() {
    try {
      console.log('[CS Controller] 获取热门道具列表');
      const items = await this.csService.getHotItems();

      return {
        code: 200,
        msg: 'success',
        data: items,
      };
    } catch (error) {
      console.error('[CS Controller] 获取热门道具失败:', error);
      return {
        code: 500,
        msg: error.message || '获取热门道具失败',
        data: [],
      };
    }
  }

  /**
   * 获取道具价格历史
   * GET /api/cs/price-history/:itemId
   */
  @Get('price-history/:itemId')
  async getPriceHistory(@Param('itemId') itemId: string) {
    try {
      console.log(`[CS Controller] 获取道具价格历史: ${itemId}`);
      const history = await this.csService.getPriceHistory(itemId);

      return {
        code: 200,
        msg: 'success',
        data: history,
      };
    } catch (error) {
      console.error('[CS Controller] 获取价格历史失败:', error);
      return {
        code: 500,
        msg: error.message || '获取价格历史失败',
        data: [],
      };
    }
  }

  /**
   * 创建价格预警
   * POST /api/cs/alerts
   */
  @Post('alerts')
  async createAlert(@Body() body: {
    itemId: string;
    itemName: string;
    targetPrice: number;
    alertType: 'below' | 'above';
    deviceToken?: string;
  }) {
    try {
      console.log('[CS Controller] 创建价格预警:', body);
      const alert = await this.csService.createAlert(body);

      return {
        code: 200,
        msg: 'success',
        data: alert,
      };
    } catch (error) {
      console.error('[CS Controller] 创建预警失败:', error);
      return {
        code: 500,
        msg: error.message || '创建预警失败',
        data: null,
      };
    }
  }

  /**
   * 获取预警列表
   * GET /api/cs/alerts
   */
  @Get('alerts')
  async getAlerts() {
    try {
      console.log('[CS Controller] 获取预警列表');
      const alerts = await this.csService.getAlerts();

      return {
        code: 200,
        msg: 'success',
        data: alerts,
      };
    } catch (error) {
      console.error('[CS Controller] 获取预警列表失败:', error);
      return {
        code: 500,
        msg: error.message || '获取预警列表失败',
        data: [],
      };
    }
  }

  /**
   * 删除预警
   * DELETE /api/cs/alerts/:alertId
   */
  @Delete('alerts/:alertId')
  async deleteAlert(@Param('alertId') alertId: string) {
    try {
      console.log(`[CS Controller] 删除预警: ${alertId}`);
      await this.csService.deleteAlert(alertId);

      return {
        code: 200,
        msg: 'success',
        data: null,
      };
    } catch (error) {
      console.error('[CS Controller] 删除预警失败:', error);
      return {
        code: 500,
        msg: error.message || '删除预警失败',
        data: null,
      };
    }
  }

  /**
   * 检查预警（定时任务）
   * POST /api/cs/check-alerts
   */
  @Post('check-alerts')
  @HttpCode(HttpStatus.OK)
  async checkAlerts() {
    try {
      console.log('[CS Controller] 开始检查预警');
      await this.csService.checkAlerts();

      return {
        code: 200,
        msg: 'success',
        data: null,
      };
    } catch (error) {
      console.error('[CS Controller] 检查预警失败:', error);
      return {
        code: 500,
        msg: error.message || '检查预警失败',
        data: null,
      };
    }
  }
}

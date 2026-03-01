import { Injectable } from '@nestjs/common';
import { getSupabaseClient } from '../storage/database/supabase-client';

export interface CsItemPrice {
  name: string;
  nameEn: string;
  price: number;
  currency: string;
  imageUrl?: string;
  category?: string;
  rarity?: string;
  marketUrl?: string;
  changePercent?: number;
}

export interface ExchangeRate {
  currency: string;
  name: string;
  rate: number;
  changePercent?: number;
}

@Injectable()
export class CsService {
  private supabase = getSupabaseClient();

  /**
   * 获取真实货币汇率（演示外部 API 调用）
   */
  async getRealExchangeRates(): Promise<ExchangeRate[]> {
    try {
      console.log('[ExchangeRate] 开始获取真实汇率数据...');

      // 使用 ExchangeRate-API.com 免费公开 API
      const url = 'https://api.exchangerate-api.com/v4/latest/CNY';
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`ExchangeRate API 请求失败: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('[ExchangeRate] API 响应:', data.rates);

      // 提取常用货币汇率
      const currencies = [
        { code: 'USD', name: '美元' },
        { code: 'EUR', name: '欧元' },
        { code: 'GBP', name: '英镑' },
        { code: 'JPY', name: '日元' },
        { code: 'KRW', name: '韩元' },
        { code: 'HKD', name: '港币' },
        { code: 'SGD', name: '新加坡元' },
        { code: 'AUD', name: '澳元' },
        { code: 'CAD', name: '加元' },
      ];

      const rates: ExchangeRate[] = currencies.map((curr) => ({
        currency: curr.code,
        name: curr.name,
        rate: data.rates[curr.code] || 0,
        changePercent: Math.random() * 2 - 1, // 模拟涨跌幅 -1% 到 +1%
      }));

      console.log(`[ExchangeRate] 成功获取 ${rates.length} 种货币汇率`);
      return rates;
    } catch (error) {
      console.error('[ExchangeRate] 获取汇率数据失败:', error);
      throw new Error(`获取汇率数据失败: ${error.message}`);
    }
  }

  /**
   * 抓取 CS 道具价格数据（模拟数据）
   */
  async scrapeCsPrices(): Promise<CsItemPrice[]> {
    try {
      console.log('[CSGOBackpack] 开始抓取价格数据...');

      // CSGOBackpack 公开 API - 热门道具价格
      const url = 'https://prices.csgobackpack.net/api/v1/prices/current/';
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`CSGOBackpack API 请求失败: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('[CSGOBackpack] API 响应:', Object.keys(data).length, '个道具');

      // Filter hot items
      const hotItemsList = [
        '★ StatTrak™ M9 Bayonet | Crimson Web (Factory New)',
        'AWP | Dragon Lore (Factory New)',
        'M4A4 | Howl (Factory New)',
        '★ Karambit | Fade (Factory New)',
        'AK-47 | Fire Serpent (Field-Tested)',
        'AK-47 | Redline (Field-Tested)',
        'AWP | Asiimov (Field-Tested)',
        'USP-S | Kill Confirmed (Field-Tested)',
        'M4A1-S | Hyper Beast (Field-Tested)',
        'Glock-18 | Fade (Factory New)',
      ];

      const items: CsItemPrice[] = [];

      for (const itemName of hotItemsList) {
        if (!data[itemName]) {
          continue;
        }

        const itemData = data[itemName];
        const price7days = itemData.price?.['7_days']?.median || 0;
        
        if (price7days > 0) {
          items.push({
            name: itemName,
            nameEn: itemName,
            price: price7days,
            currency: 'USD', // CSGOBackpack 默认美元
            imageUrl: '', // API 不返回图片
            category: 'CSGO 饰品',
            rarity: '未知',
            marketUrl: 'https://csbackpack.net',
            changePercent: 0, // 可以计算7天涨跌幅
          });
        }
      }

      console.log(`[CSGOBackpack] 成功抓取 ${items.length} 条价格数据`);

      // 如果没有获取到数据，返回空数组
      if (items.length === 0) {
        console.warn('[CSGOBackpack] 未获取到任何价格数据');
      }

      return items;
    } catch (error) {
      console.error('[CSGOBackpack] 抓取价格数据失败:', error);
      throw new Error(`抓取价格数据失败: ${error.message}`);
    }
  }

  /**
   * 保存道具和价格数据到数据库
   */
  async savePrices(items: CsItemPrice[]): Promise<void> {
    try {
      for (const item of items) {
        // 1. 查找或创建道具
        let existingItem: any = null;
        const { data: foundItems } = await this.supabase
          .from('cs_items')
          .select('*')
          .eq('name', item.name)
          .limit(1);

        if (foundItems && foundItems.length > 0) {
          existingItem = foundItems[0];
        }

        let itemId: string;

        if (existingItem) {
          itemId = existingItem.id;
          // 更新道具信息
          await this.supabase
            .from('cs_items')
            .update({
              image_url: item.imageUrl,
              market_url: item.marketUrl,
              category: item.category,
              rarity: item.rarity,
              updated_at: new Date().toISOString(),
            })
            .eq('id', itemId);
        } else {
          // 创建新道具
          const { data: newItem } = await this.supabase
            .from('cs_items')
            .insert({
              name: item.name,
              name_en: item.nameEn,
              image_url: item.imageUrl,
              market_url: item.marketUrl,
              category: item.category,
              rarity: item.rarity,
            })
            .select()
            .single();

          if (newItem) {
            itemId = newItem.id;
          } else {
            console.error('创建道具失败:', item.name);
            continue;
          }
        }

        // 2. 保存价格记录
        await this.supabase
          .from('cs_prices')
          .insert({
            item_id: itemId,
            price: item.price,
            currency: item.currency,
            market_source: 'buff',
            change_percent: item.changePercent,
          });
      }

      console.log(`成功保存 ${items.length} 条价格记录`);
    } catch (error) {
      console.error('保存价格数据失败:', error);
      throw new Error('保存价格数据失败');
    }
  }

  /**
   * 获取热门道具列表
   */
  async getHotItems(): Promise<any[]> {
    try {
      // 获取每个道具的最新价格
      const { data: items, error } = await this.supabase
        .from('cs_items')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) {
        throw error;
      }

      // 获取每个道具的最新价格
      const itemsWithPrice = await Promise.all(
        (items || []).map(async (item) => {
          const { data: prices } = await this.supabase
            .from('cs_prices')
            .select('*')
            .eq('item_id', item.id)
            .order('created_at', { ascending: false })
            .limit(1);

          const latestPrice = prices && prices.length > 0 ? prices[0] : null;

          return {
            ...item,
            price: latestPrice ? Number(latestPrice.price) : 0,
            changePercent: latestPrice ? Number(latestPrice.change_percent) : 0,
          };
        })
      );

      return itemsWithPrice;
    } catch (error) {
      console.error('获取热门道具失败:', error);
      throw new Error('获取热门道具失败');
    }
  }

  /**
   * 获取道具价格历史
   */
  async getPriceHistory(itemId: string, limit: number = 30): Promise<any[]> {
    try {
      const { data, error } = await this.supabase
        .from('cs_prices')
        .select('*')
        .eq('item_id', itemId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        throw error;
      }

      return (data || []).map((price) => ({
        ...price,
        price: Number(price.price),
        changePercent: Number(price.change_percent),
      })).reverse();
    } catch (error) {
      console.error('获取价格历史失败:', error);
      throw new Error('获取价格历史失败');
    }
  }

  /**
   * 创建价格预警
   */
  async createAlert(alertData: {
    itemId: string;
    itemName: string;
    targetPrice: number;
    alertType: 'below' | 'above';
    deviceToken?: string;
  }): Promise<any> {
    try {
      const { data, error } = await this.supabase
        .from('cs_alerts')
        .insert({
          item_id: alertData.itemId,
          item_name: alertData.itemName,
          target_price: alertData.targetPrice,
          alert_type: alertData.alertType,
          device_token: alertData.deviceToken,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('创建预警失败:', error);
      throw new Error('创建预警失败');
    }
  }

  /**
   * 获取用户的预警列表
   */
  async getAlerts(userId?: string): Promise<any[]> {
    try {
      let query = this.supabase
        .from('cs_alerts')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      return (data || []).map((alert) => ({
        ...alert,
        targetPrice: Number(alert.target_price),
      }));
    } catch (error) {
      console.error('获取预警列表失败:', error);
      throw new Error('获取预警列表失败');
    }
  }

  /**
   * 删除预警
   */
  async deleteAlert(alertId: string): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('cs_alerts')
        .delete()
        .eq('id', alertId);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('删除预警失败:', error);
      throw new Error('删除预警失败');
    }
  }

  /**
   * 检查预警并触发通知
   */
  async checkAlerts(): Promise<void> {
    try {
      // 1. 获取所有活跃的预警
      const { data: alerts, error: alertsError } = await this.supabase
        .from('cs_alerts')
        .select('*')
        .eq('is_active', true)
        .eq('is_triggered', false);

      if (alertsError) {
        throw alertsError;
      }

      if (!alerts || alerts.length === 0) {
        console.log('没有需要检查的预警');
        return;
      }

      // 2. 检查每个预警
      for (const alert of alerts) {
        // 获取道具的最新价格
        const { data: prices } = await this.supabase
          .from('cs_prices')
          .select('*')
          .eq('item_id', alert.item_id)
          .order('created_at', { ascending: false })
          .limit(1);

        if (!prices || prices.length === 0) {
          continue;
        }

        const currentPrice = Number(prices[0].price);
        const targetPrice = Number(alert.target_price);
        let shouldTrigger = false;

        // 检查是否满足触发条件
        if (alert.alert_type === 'below' && currentPrice < targetPrice) {
          shouldTrigger = true;
        } else if (alert.alert_type === 'above' && currentPrice > targetPrice) {
          shouldTrigger = true;
        }

        if (shouldTrigger) {
          console.log(`预警触发：${alert.item_name} 当前价格 ¥${currentPrice} ${alert.alert_type === 'below' ? '低于' : '高于'} 目标价格 ¥${targetPrice}`);

          // 更新预警状态
          await this.supabase
            .from('cs_alerts')
            .update({
              is_triggered: true,
              triggered_at: new Date().toISOString(),
            })
            .eq('id', alert.id);

          // TODO: 发送通知到手机
          // 可以使用微信小程序订阅消息或其他推送服务
          if (alert.device_token) {
            console.log(`发送通知到设备: ${alert.device_token}`);
            // 调用推送服务
          }
        }
      }
    } catch (error) {
      console.error('检查预警失败:', error);
      throw new Error('检查预警失败');
    }
  }
}

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

@Injectable()
export class CsService {
  private supabase = getSupabaseClient();

  /**
   * 抓取 CS 道具价格数据（从 Buff163 等市场）
   */
  async scrapeCsPrices(): Promise<CsItemPrice[]> {
    try {
      // 注意：实际生产环境需要使用真实的市场网站 URL
      // 这里使用 fetch-url 抓取数据
      // 由于需要登录等复杂操作，这里提供模拟数据接口

      // 实际实现时，可以使用 fetch-url 抓取页面，然后解析价格
      // const response = await this.fetchClient.fetch('https://buff.163.com/market/csgo');

      // 模拟热门道具数据
      const mockItems: CsItemPrice[] = [
        {
          name: 'AK-47 | 红线',
          nameEn: 'AK-47 | Redline',
          price: 158.50,
          currency: 'CNY',
          imageUrl: 'https://cdn.cloudflare.steamstatic.com/apps/730/8c9309d069f4617da93a6b5ebbb42905b6eb85b3.png',
          category: '步枪',
          rarity: '隐秘',
          marketUrl: 'https://buff.163.com/item/...',
          changePercent: 2.5,
        },
        {
          name: 'AWP | 龙狙',
          nameEn: 'AWP | Dragon Lore',
          price: 15800.00,
          currency: 'CNY',
          imageUrl: 'https://cdn.cloudflare.steamstatic.com/apps/730/econ/weapons/base_weapons/weapon_awp.png',
          category: '狙击枪',
          rarity: '隐秘',
          marketUrl: 'https://buff.163.com/item/...',
          changePercent: -1.2,
        },
        {
          name: 'M4A4 | 龙王',
          nameEn: 'M4A4 | Howl',
          price: 18500.00,
          currency: 'CNY',
          imageUrl: 'https://cdn.cloudflare.steamstatic.com/apps/730/econ/weapons/base_weapons/weapon_m4a1.png',
          category: '步枪',
          rarity: '隐秘',
          marketUrl: 'https://buff.163.com/item/...',
          changePercent: 5.8,
        },
        {
          name: 'AK-47 | 二西莫夫',
          nameEn: 'AK-47 | Asiimov',
          price: 89.00,
          currency: 'CNY',
          imageUrl: 'https://cdn.cloudflare.steamstatic.com/apps/730/8c9309d069f4617da93a6b5ebbb42905b6eb85b3.png',
          category: '步枪',
          rarity: '隐秘',
          marketUrl: 'https://buff.163.com/item/...',
          changePercent: -3.5,
        },
        {
          name: 'USP-S | 黑色魅影',
          nameEn: 'USP-S | Kill Confirmed',
          price: 1250.00,
          currency: 'CNY',
          imageUrl: 'https://cdn.cloudflare.steamstatic.com/apps/730/econ/weapons/base_weapons/weapon_usp_silencer.png',
          category: '手枪',
          rarity: '隐秘',
          marketUrl: 'https://buff.163.com/item/...',
          changePercent: 0.8,
        },
      ];

      return mockItems;
    } catch (error) {
      console.error('抓取 CS 价格数据失败:', error);
      throw new Error('抓取价格数据失败');
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

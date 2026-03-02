import { pgTable, serial, timestamp, varchar, numeric, boolean, integer, text, jsonb } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { createSchemaFactory } from "drizzle-zod"
import { z } from "zod"
import { index } from "drizzle-orm/pg-core"

export const healthCheck = pgTable("health_check", {
	id: serial().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

// CS 道具表
export const csItems = pgTable(
	"cs_items",
	{
		id: varchar("id", { length: 36 })
			.primaryKey()
			.default(sql`gen_random_uuid()`),
		name: varchar("name", { length: 255 }).notNull(),
		nameEn: varchar("name_en", { length: 255 }),
		imageUrl: text("image_url"),
		marketUrl: text("market_url"),
		category: varchar("category", { length: 100 }),
		rarity: varchar("rarity", { length: 50 }),
		isActive: boolean("is_active").default(true).notNull(),
		createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	},
	(table) => [
		index("cs_items_name_idx").on(table.name),
		index("cs_items_category_idx").on(table.category),
	]
);

// CS 价格历史表
export const csPrices = pgTable(
	"cs_prices",
	{
		id: varchar("id", { length: 36 })
			.primaryKey()
			.default(sql`gen_random_uuid()`),
		itemId: varchar("item_id", { length: 36 }).notNull(),
		price: numeric("price", { precision: 10, scale: 2 }).notNull(),
		currency: varchar("currency", { length: 10 }).default("CNY").notNull(),
		marketSource: varchar("market_source", { length: 50 }).default("buff").notNull(),
		changePercent: numeric("change_percent", { precision: 5, scale: 2 }),
		createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' })
			.defaultNow()
			.notNull(),
	},
	(table) => [
		index("cs_prices_item_id_idx").on(table.itemId),
		index("cs_prices_created_at_idx").on(table.createdAt),
	]
);

// CS 价格预警表
export const csAlerts = pgTable(
	"cs_alerts",
	{
		id: varchar("id", { length: 36 })
			.primaryKey()
			.default(sql`gen_random_uuid()`),
		itemId: varchar("item_id", { length: 36 }).notNull(),
		itemName: varchar("item_name", { length: 255 }).notNull(),
		targetPrice: numeric("target_price", { precision: 10, scale: 2 }).notNull(),
		alertType: varchar("alert_type", { length: 20 }).notNull(), // 'below' | 'above'
		isActive: boolean("is_active").default(true).notNull(),
		isTriggered: boolean("is_triggered").default(false).notNull(),
		userId: varchar("user_id", { length: 255 }), // 用户ID（可选）
		deviceToken: varchar("device_token", { length: 500 }), // 设备推送令牌
		createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' })
			.defaultNow()
			.notNull(),
		triggeredAt: timestamp("triggered_at", { withTimezone: true, mode: 'string' }),
	},
	(table) => [
		index("cs_alerts_item_id_idx").on(table.itemId),
		index("cs_alerts_is_active_idx").on(table.isActive),
	]
);

// Zod schemas
const { createInsertSchema: createCoercedInsertSchema } = createSchemaFactory({
	coerce: { date: true },
});

export const insertCsItemSchema = createCoercedInsertSchema(csItems).pick({
	name: true,
	nameEn: true,
	imageUrl: true,
	marketUrl: true,
	category: true,
	rarity: true,
});

export const insertCsPriceSchema = createCoercedInsertSchema(csPrices).pick({
	itemId: true,
	price: true,
	currency: true,
	marketSource: true,
	changePercent: true,
});

export const insertCsAlertSchema = createCoercedInsertSchema(csAlerts).pick({
	itemId: true,
	itemName: true,
	targetPrice: true,
	alertType: true,
	userId: true,
	deviceToken: true,
});

// TypeScript types
export type CsItem = typeof csItems.$inferSelect;
export type InsertCsItem = z.infer<typeof insertCsItemSchema>;
export type CsPrice = typeof csPrices.$inferSelect;
export type InsertCsPrice = z.infer<typeof insertCsPriceSchema>;
export type CsAlert = typeof csAlerts.$inferSelect;
export type InsertCsAlert = z.infer<typeof insertCsAlertSchema>;

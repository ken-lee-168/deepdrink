import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const chatsTable = pgTable("chat", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("text").notNull(),
  model: text("model").notNull(),
});

export const messagesTable = pgTable("messages", {
  id: serial("id").primaryKey(),
  chatId: integer("chat_id").references(() => chatsTable.id),
  role: text("role").notNull(),
  content: text("content").notNull(),
});

export type ChatModel = typeof chatsTable.$inferSelect;
export type MessagesModel = typeof chatsTable.$inferSelect;

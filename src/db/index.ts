import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { chatsTable, messagesTable } from './schema';
import { and, desc, eq } from 'drizzle-orm';

const client = postgres(process.env.DATABASE_URL!)
const db = drizzle({ client });

// chats
export const createChat = async (title: string, userId: string, model: string) => {
    try {
        const [newChat] = await db.insert(chatsTable).values({
            title,
            userId,
            model
        }).returning()
        return newChat
    } catch (error) {
        console.log("error creating chat", error)
        return null
    }
}

// getChat
export const getChat = async (chatId: number,userId: string) => {
    try {
        const chat = await db.select().from(chatsTable).where(and(eq(chatsTable.id, chatId),eq(chatsTable.userId, userId)))
        if (chat.length === 0) {
            return null
        }
        return chat[0]
    } catch (error) {
        console.log("error getting chat", error)
        return null
    }
}

// getChats
export const getChats = async (userId: string) => {
  try {
    const chats = await db.select().from(chatsTable).where(eq(chatsTable.userId, userId)).orderBy(desc(chatsTable.id))
    return chats
  } catch (error) {
    console.log("error getting chats", error)
    return null
  }
}

// messages
export const createMessages = async(chatId: number, content: string, role: string) => {
  try {
    const [newMessage] = await db.insert(messagesTable).values({
      chatId,
      role,
      content
    }).returning()
    return newMessage
  } 
  catch (error) {
    console.log("error creating message", error)
    return null
  }
}

export const getMessages = async(chatId: number) => {
  try {
    const messages = await db.select().from(messagesTable).where(eq(messagesTable.chatId, chatId))
    if (messages.length === 0) {
      return null
    }
    return messages
  }
  catch (error) {
    console.log("error getting messages", error)
    return null
  }
}
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from "postgres"

const client = postgres(process.env.DATABASE_URL!)
const db = drizzle({
    client
})

export const createChat = (title: string, userId: string, model: string) => {
    try {
        // 连接数据库，写入值
        const [newChat] = await db.insert()


    } catch(error) {

        console.log(error)
    }

}
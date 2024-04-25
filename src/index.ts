import express, {Express} from "express"
import { appRouter } from "./routes"
import pg from 'pg'
const { Client } = pg

const client = new Client( {
    host: "localhost",
    port: 5432,
    database: "test",
    user: "postgres",
    password: "test",
})

const app: Express = express()
const port: Number = 5050

app.use("/", appRouter)

app.listen(port, async () => {
    console.log(`Server is running at https://localhost:${port}`)
    //подключаемся к серверу
    await client.connect()
    //выполним запрос
    const result = await client.query(`SELECT balance AS value from accounts`)
    console.log(result)
})

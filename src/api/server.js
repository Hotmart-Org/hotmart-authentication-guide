import dotenv from 'dotenv'
import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'

dotenv.config()

const { API_PORT } = process.env
const server = express()

server.set('views', path.join(path.resolve(), 'src/api/views'))
server.set('view engine', 'ejs')

server.use(express.json())
server.use(cookieParser())

server.listen(API_PORT, () => console.log(`Backend started on http://localhost:${API_PORT}`))

export default server

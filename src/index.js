import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.js'
import favRoutes from './routes/fav.js'
import connectDB from './config/DatabaseConfig.js'

dotenv.config()

connectDB()

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/auth', authRoutes)
app.use('/fav', favRoutes)

const PORT = process.env.PORT || 5000

app.listen(
    PORT, 
    console.log(`Server running with on port ${PORT}`)
)

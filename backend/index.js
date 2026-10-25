import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import User from './User.js'
import express from 'express'
import mongoose from 'mongoose'

const app = express()
const PORT = 5000
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.cheyrxr.mongodb.net/`

app.use(cors())
app.use(express.json())

app.post('/', async (req,res) => {
    try {
        const {username, email, password} = req.body
        const user = await User.create({username, email, password})
        console.log(user)
    } catch (error) {
        console.error('Error creating user:', error)
    }
    
    
    res.json('user is added!')
})

async function startApp() {
    try {
        await mongoose.connect(DB_URL)
        console.log('DB connected')
    } catch (e) {
        console.log('DB connection error', e)
    }
}

startApp()

app.listen(PORT, () => {
    console.log(`server started localhost:${PORT}`)
})

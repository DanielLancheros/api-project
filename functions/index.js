import { onRequest } from 'firebase-functions/v2/https'
import express from 'express'
import cors from 'cors'
import { getCars, addNewCars, updateCarsById } from './src/cars.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get("/test", (req,res) => res.send("hello"))
app.get("/cars", getCars)
app.post("/cars", addNewCars)
app.patch("/cars/:carsId", updateCarsById)

export const api = onRequest({ maxInstances: 10}, app);
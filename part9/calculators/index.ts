import express = require('express')
import { calculateBmi } from './bmiCalculator'

const app = express()

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query

    if (Number.isNaN(Number(weight)) || Number.isNaN(Number(height))) {
        res.status(400).json({ error: "malformatted parameters" })
    }

    const bmi = calculateBmi(Number(height), Number(weight))

    res.status(200).json({ height, weight, bmi })
})

const PORT = 3002

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});

import express = require('express');
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

export interface Parameters {
    target: number,
    daily_exercises: number[]
}

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;

    if (Number.isNaN(Number(weight)) || Number.isNaN(Number(height))) {
        res.status(400).json({ error: "malformatted parameters" });
    }

    const bmi = calculateBmi(Number(height), Number(weight));

    res.status(200).json({ height, weight, bmi });
});

app.post('/exercises', (req, res) => {
    const { target, daily_exercises } = req.body as Parameters;

    if (!target || !daily_exercises) {
        res.status(400).json({ error: "parameters missing" });
    }

    const nanExists = daily_exercises.some(a => isNaN(a));

    if (isNaN(Number(target)) || nanExists) {
        res.status(400).json({ error: "malformatted parameters" });
    }

    res.status(200).json(calculateExercises(target, daily_exercises));
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

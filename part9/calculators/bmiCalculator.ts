const calculateBmi = (height: number, mass: number): String => {
    const bmi = mass / ((height / 100) ^ 2)

    if (bmi < 18.5)
        return "Underweight (unhealthy)"
    else if (bmi < 25)
        return "Normal (healthy weight)"
    else if (bmi < 30)
        return "Overweight (at risk)"
    else
        return "Obese (severely obese)"
}

const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])

console.log(calculateBmi(height, weight))

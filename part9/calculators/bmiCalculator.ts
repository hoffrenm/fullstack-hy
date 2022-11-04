interface BmiValues {
    height: number,
    weight: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length < 4) throw new Error('Too many arguments');

    if (Number.isNaN(Number(args[2])) || Number.isNaN(Number(args[3]))) {
        throw new Error('Provided values were not numbers');
    }

    return {
        height: Number(args[2]),
        weight: Number(args[3])
    };
};

export const calculateBmi = (height: number, mass: number): string => {
    const bmi = mass / ((height / 100) ^ 2);

    if (bmi < 18.5)
        return "Underweight (unhealthy)";
    else if (bmi < 25)
        return "Normal (healthy weight)";
    else if (bmi < 30)
        return "Overweight (at risk)";
    else if (bmi < 35)
        return "Obese";
    else
        return "Extremely obese";
};

try {
    if (require.main === module) {
        const { height, weight } = parseArguments(process.argv);
        console.log(calculateBmi(height, weight));
    }
} catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

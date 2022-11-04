interface exerciseValues {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface argumentValues {
    target: number;
    dailyHours: Array<number>;
}

const parseArguments = (args: Array<string>): argumentValues => {
    if (args.length < 4) throw new Error(`Invalid amount of arguments`);

    const target = Number(args[2]);
    const dailyHours = args.slice(3).map(el => Number(el));

    if (Number.isNaN(target)) throw new Error(`Target must be a number`);

    if (dailyHours.some(el => Number.isNaN(el))) {
        throw new Error(`Provided values contain something other than numbers`);
    }

    return { target, dailyHours };
};

export const calculateExercises = (target: number, hours: Array<number>): exerciseValues => {
    const daysStudied = hours.filter(time => time > 0).length;
    const averaged = hours.reduce((a, b) => a + b, 0) / hours.length;

    let rated = 0;
    let description = "";

    if (averaged > target) {
        rated = 3;
        description = "Fantastic!";
    } else if (averaged > (target / 2)) {
        rated = 2;
        description = "Well done but there is always room for improvement";
    } else {
        rated = 1;
        description = "You need to study more";
    }


    return {
        periodLength: hours.length,
        trainingDays: daysStudied,
        success: averaged >= target,
        rating: rated,
        ratingDescription: description,
        target: target,
        average: averaged,
    };
};

try {
    if (require.main === module) {
        const { target, dailyHours } = parseArguments(process.argv);
        console.log(calculateExercises(target, dailyHours));
    }
} catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }

    console.log(errorMessage);
}

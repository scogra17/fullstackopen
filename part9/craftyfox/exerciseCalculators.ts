interface ExerciseResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

const calculateExercises = (exerciseHours: Array<number>, target: number): ExerciseResult => {
  const daysTrained: number = exerciseHours.filter(h => h > 0).length;
  
  return {
    periodLength: exerciseHours.length,
    trainingDays: daysTrained,
    success: daysTrained > target,
    rating: 0,
    ratingDescription: "",
    target: target,
    average: exerciseHours.reduce((a, b) => a + b) / exerciseHours.length
  };
};

interface ExerciseInput {
  target: number,
  totals: Array<number>
}

const parseArguments = (args: Array<string>): ExerciseInput => {
  if (args.length < 4) throw new Error("Not enough arguments");
  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error("Input must be numbers");
    }
  }
  return {
    target: Number(args[2]),
    totals: args.slice(3,).map(v => Number(v))
  };
};

try {
  const { target, totals } = parseArguments(process.argv);
  console.log(calculateExercises(totals, target));
} catch (error: unknown) {
  let errorMessage = "Something went wrong.";
  if (error instanceof Error) {
    errorMessage += " Error. " + error.message;
  }
  console.log(errorMessage);
}


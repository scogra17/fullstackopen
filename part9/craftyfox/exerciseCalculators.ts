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
  const daysTrained: number = exerciseHours.filter(h => h > 0).length
  
  return {
    periodLength: exerciseHours.length,
    trainingDays: daysTrained,
    success: daysTrained > target,
    rating: 0,
    ratingDescription: "",
    target: target,
    average: exerciseHours.reduce((a, b) => a + b) / 7
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

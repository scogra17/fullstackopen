const calculateBmi = (heightCm: number, weightKg: number): string => {
  const heightM = heightCm / 100
  const bmi: number = weightKg / heightM**2 
  
  switch (true) {
    case (bmi < 18.5):
      return "Underweight"
    case (bmi < 25):
      return "Normal (healthy weight)"
    case (bmi < 30): 
      return "Overweight"
    default:
      return "Obese"
  }
}

interface BodyInput {
  height: number,
  weight: number
}

const parseArguments = (values: Array<string>): BodyInput => {
  if (values.length < 4) throw new Error("Not enough arguments");
  if (values.length > 4) throw new Error("Too many arguments");
  if (!isNaN(Number(values[2])) && !isNaN(Number(values[3]))) {
    return {
      height: Number(values[2]),
      weight: Number(values[3])
    }
  } else {
    throw new Error("Please provide numbers")
  }
}

try {
  const { height, weight } = parseArguments(process.argv)
  console.log(calculateBmi(height, weight))
} catch(error: unknown) {
  let errorMessage = "Something went wrong."
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message
  }
  console.log(errorMessage)
}

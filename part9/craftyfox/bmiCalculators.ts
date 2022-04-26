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

console.log(calculateBmi(180, 74))

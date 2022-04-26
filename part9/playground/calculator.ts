type Operation = 'multiply' | 'add' | 'divide';
type Result = number;

const calculator = (a: number, b: number, op: Operation): Result => {
  switch (op) {
    case 'multiply':
      return a * b;
    case 'add': 
      return a + b;
    case 'divide': 
      if (b === 0) throw new Error ('cant\'t divide by 0!');
      return a / b;
    default:
      throw new Error ('Operation is not possible. Multiply, add or divide!');
  }
}

console.log(process.argv)

try {
  console.log(calculator(2, 4, 'add'));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += 'Error: ' + error.message;
  }
  console.log(errorMessage)
}

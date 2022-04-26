import express from 'express';
import { calculateBmi } from './bmiCalculators';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
})

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight)
  const height = Number(req.query.height)
  if (isNaN(height) || isNaN(weight)) {
    res.status(400);
    res.json({
      error: "malformed parameters"
    })
  } else {
    const bmi = calculateBmi(height, weight)
    
    const response = {
      weight: weight,
      height: height,
      bmi: bmi
    }
  
    res.json(response)
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

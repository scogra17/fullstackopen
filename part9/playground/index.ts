import express from 'express'
import bodyParser from 'body-parser';
import { calculator } from './calculator'

const app = express();

// create application/json parser
var jsonParser = bodyParser.json()

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.post('/calculate', jsonParser, (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  console.log(req.body);
  const { value1, value2, op } = req.body;

  if ( !value1 || isNaN(Number(value1))) {
    res.sendStatus(400);
    return res.send({ error: "..."});
  }

  if ( !value2 || isNaN(Number(value2))) {
    res.sendStatus(400);
    return res.send({ error: "..."});
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculator(Number(value1), Number(value2), op);
  console.log(`the result is: ${result}`)
  return res.json(String(result))
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

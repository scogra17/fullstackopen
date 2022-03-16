const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://scottgraham:${password}@cluster0.0q46p.mongodb.net/phoneBookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv[3] && process.argv[4]) {
  // const person = {
  //   name: "Boogaloo",
  //   number: "123"
  // }

  // Person.findByIdAndUpdate("621e9e5fa85c8d5494189018", person, {new: true})
  //   .then(result => {
  //     console.log(result)
  //     mongoose.connection.close()
  //   })

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
    date: new Date(),
  })

  person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password!')
  process.exit(1)
}

const password = process.argv[2]


const url = `mongodb+srv://timo:${password}@cluster0-vjec6.mongodb.net/persons-app?retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name,
    number,
    date: new Date()
  })

  person.save().then(() => {
    console.log('note saved')
    mongoose.connection.close()
  })
    .catch(err => {
      console.log('yritettiin seivata', err)
      mongoose.connection.close()
    })
}

else {
  Person.find({}).then(response => {
    response.forEach(person => {
      console.log('Phonebook')
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

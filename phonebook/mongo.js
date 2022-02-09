const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2];

const url =
  `mongodb+srv://fullstack:${password}@cluster0.ij31k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  id: Number,
  name: String, 
  number: Number,
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length === 3)
{
  Contact.find({}).then(result => {
    result.forEach(contact => {
      console.log(contact)
    })
    mongoose.connection.close()
  })
}
else if (process.argv.length > 4) {
  const name = process.argv[3];
  const number = process.argv[4];
  const contact = new Contact({
    name: name, 
    number: number,
  })

  contact.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
else if (process.argv.length > 3 && process.argv.length <= 4) {
  console.log("Too few arguments: Please provide the name and number of the contact.")
  process.exit(1)
}
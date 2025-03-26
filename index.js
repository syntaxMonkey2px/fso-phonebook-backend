const Person = require('./models/person')
const http = require('http')
const express = require('express')
const { log } = require('console')

const app = express()

app.use(express.json());

let persons = [
    
        { 
          "id": "1",
          "name": "Arto Hellas", 
          "number": "040-123456"
        },
        { 
          "id": "2",
          "name": "Ada Lovelace", 
          "number": "39-44-5323523"
        },
        { 
          "id": "3",
          "name": "Dan Abramov", 
          "number": "12-43-234345"
        },
        { 
          "id": "4",
          "name": "Mary Poppendieck", 
          "number": "39-23-6423122"
        }
    
]


app.get('/api/persons', (request, response)=>{
    response.json(persons)
})



app.get('/api/persons/:id', (request, response)=>{
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if(person){
        response.json(person)
    }else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    response.status(204).end()
})

app.get('/info', (request, response)=> {
    const numPeople = persons.length
    const latestDate = new Date
    
    response.send(`<p>Phonebook has info for ${numPeople} people</p>
                    <p>Last update: ${latestDate}</p>`)
})



app.post('/api/persons', (request, response)=>{

    const body = request.body

    if (!body.name || !body.number){
        return response.status(404).json({  
            error: 'bro content is empty'
        })
    }

    const currentPerson = persons.find(person => person.name === body.name);

    if(currentPerson){
        return response.status(400).json({ 
            error: 'name must be unique' 
        })
    }


    const person = request.body;
    
    //do ... while terminates when while = false
    let newId;
    do {
        newId = Math.floor(Math.random() * 100000) 
    } while (persons.find(p => p.id === String(newId)));



    person.id = String(newId);
    persons = persons.concat(person);
    response.status(201).json(person);

})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () =>{
    console.log(`server is live running on ${PORT}`)
})
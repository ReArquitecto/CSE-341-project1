const swaggerAutogen = require('swagger-autogen')()

const doc  = {
    info: {
        title: "Contacts API",
        description: "Contacts API for a contact list",
    },
    host: "localhost:8080",
    schemes: ['http', 'https']
}

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/index.js']

// This will generate the swagger.json file
swaggerAutogen(outputFile, endpointsFiles, doc)

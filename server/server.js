const express = require('express')
const { readdirSync } = require('fs')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json({limit: '10mb'}))

// route auto 1
 readdirSync('./Routes').map((user) => app.use('/api',require('./Routes/' + user )))

app.listen(5000,()=> console.log('Sever is Rinning on port 5000'))
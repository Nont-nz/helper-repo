const express = require('express')
const { readdirSync } = require('fs')

const app = express();

// route auto 1
 readdirSync('./Routes').map((user) => app.use('/api',require('./Routes/' + user )))

app.listen(5000,()=> console.log('Sever is Rinning on port 5000'))
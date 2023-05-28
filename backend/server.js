const express = require('express');
const amazonRouter = require('./src/amazon/routes')

const app = express();

// app.set('view engine', 'ejs')
app.use(express.json())

app.get('/', (req, res) => {
    res.send('test get')
})

app.use('/amazon', amazonRouter)

const port = process.env.PORT || 8080
app.listen(port)
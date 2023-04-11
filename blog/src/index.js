const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000
const { engine } = require('express-handlebars')
const path = require('path')
    // http logger
app.use(morgan('combined'))

//template engine
app.engine(".hbs", engine({
    extname: '.hbs'
}));
app.set('view engine', '.hbs')

app.set('views', path.join(__dirname, 'resources/views'))

//route
app.get('/', (req, res) => {
    res.render('home')
})

app.get('/news', (req, res) => {
        res.render('news')
    })
    //127.0.0.1 - localhost
app.listen(port, () => console.log(`Example app listening at http: //localhost:${port}`))
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')

require('dotenv').config()

const PORT = process.env.PORT

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes)

console.log(process.env.DB_CONN)

async function start() {
    try {
        await mongoose.connect(process.env.DB_CONN, {
            useNewUrlParser: true
        })

        app.listen(PORT, () => {
            console.log('Server has been started')
        })
    } catch (err) {
        console.log(err)
    }
}

start()

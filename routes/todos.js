const {Router} = require('express')
const Todo = require('../models/Todo')

const router = Router()

router.get('/', async (req, res) => {
    const todos = await Todo.find({}).lean()

    console.log(todos)

    res.render('index', {
        title: 'Todos List',
        isIndex: true,
        todos
    })
})

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Todo',
        isCreate: true
    })
})

router.post('/create', async (req, res) => {
    const todo = new Todo({
        title: req.body.title
    })

    try {
        await todo.save()
        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
    
})

router.post('/complete', async (req, res) => {
    const todo = await Todo.findById(req.body.id)

    todo.completed = !!req.body.completed

    try {
        await todo.save()
        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
})

module.exports = router
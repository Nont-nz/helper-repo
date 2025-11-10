const express = require('express')
const router = express.Router()

router.get('/user', (req, res) => {
    res.send('hello user')
})

router.get('/user/:id', (req, res) => {
    res.send('hello user')
})

router.post('/user', (req, res) => {
    res.send('hello user')
})

router.put('/user', (req, res) => {
    res.send('hello put')
})

router.delete('/user', (req, res) => {
    res.json({ name: 'non', id: 11 })
})

module.exports = router
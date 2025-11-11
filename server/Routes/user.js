const express = require('express')
const router = express.Router()


let users = [
  { id: 11, name: 'Non', lastname: 'Nonz', age: 31 },
  { id: 22, name: 'Kaew', lastname: 'Puaprasert', age: 29 }
]


router.get('/user', (req, res) => {
  res.json(users)
})


router.get('/user/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const user = users.find(u => u.id === id)
  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json(user)
})


router.post('/user', (req, res) => {
  const { name, lastname, age } = req.body
  if (!name || !lastname || !age) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
    lastname,
    age
  }

  users.push(newUser)
  res.json({ message: 'User added successfully', user: newUser })
})


router.put('/user/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const { name, lastname, age } = req.body
  const userIndex = users.findIndex(u => u.id === id)

  if (userIndex === -1) return res.status(404).json({ error: 'User not found' })

  users[userIndex] = { ...users[userIndex], name, lastname, age }
  res.json({ message: 'User updated successfully', user: users[userIndex] })
})


router.delete('/user/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const userIndex = users.findIndex(u => u.id === id)

  if (userIndex === -1) return res.status(404).json({ error: 'User not found' })

  const deletedUser = users.splice(userIndex, 1)
  res.json({ message: 'User deleted successfully', user: deletedUser[0] })
})

module.exports = router

// นำเข้าโมดูล express เพื่อใช้สร้าง router และจัดการเส้นทาง API
const express = require('express')

// สร้าง router object จาก express
const router = express.Router()

// ---------------------- ตัวอย่างข้อมูลจำลอง ----------------------
// จำลองข้อมูลผู้ใช้ในรูปแบบ Array ของ Object (เหมือนฐานข้อมูล)
let users = [
  { id: 11, name: 'Non', lastname: 'Nonz', age: 31 },
  { id: 22, name: 'Kaew', lastname: 'Puaprasert', age: 29 }
]

// ---------------------- ดึงข้อมูลผู้ใช้ทั้งหมด ----------------------
router.get('/user', (req, res) => {
  // ส่งคืนข้อมูลทั้งหมดในรูปแบบ JSON
  res.json(users)
})

// ---------------------- ดึงข้อมูลผู้ใช้ตาม id ----------------------
router.get('/user/:id', (req, res) => {
  const id = parseInt(req.params.id) // แปลงค่า id จาก URL ให้เป็นตัวเลข
  const user = users.find(u => u.id === id) // ค้นหาผู้ใช้ใน array
  if (!user) return res.status(404).json({ error: 'User not found' }) // ถ้าไม่เจอ ส่ง error 404
  res.json(user) // ถ้าเจอ ส่งข้อมูลผู้ใช้กลับไป
})

// ---------------------- เพิ่มข้อมูลผู้ใช้ใหม่ ----------------------
router.post('/user', (req, res) => {
  const { name, lastname, age } = req.body // ดึงค่าจาก body ที่ส่งมา

  // ตรวจสอบว่ามีข้อมูลครบหรือไม่
  if (!name || !lastname || !age) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // สร้าง object ของผู้ใช้ใหม่ พร้อมกำหนด id อัตโนมัติ
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1, // ถ้ามีข้อมูลแล้ว +1 ถ้ายังไม่มีเริ่มที่ 1
    name,
    lastname,
    age
  }

  // เพิ่มผู้ใช้ใหม่เข้า array
  users.push(newUser)

  // ส่งข้อความและข้อมูลผู้ใช้กลับไป
  res.json({ message: 'User added successfully', user: newUser })
})

// ---------------------- แก้ไขข้อมูลผู้ใช้ตาม id ----------------------
router.post('/user/:id', (req, res) => {
  const id = parseInt(req.params.id) // แปลง id จาก URL
  const updates = req.body // ดึงข้อมูลที่จะอัปเดตจาก body
  const userIndex = users.findIndex(u => u.id === id) // หาตำแหน่งของ user ใน array

  // ถ้าไม่พบ id ที่ต้องการแก้ไข
  if (userIndex === -1)
    return res.status(404).json({ error: 'User not found' })

  // รวมข้อมูลเดิมกับข้อมูลใหม่ (เฉพาะฟิลด์ที่ส่งมาเท่านั้น)
  const updatedUser = { ...users[userIndex], ...updates }

  // แทนค่าผู้ใช้ใน array ด้วยข้อมูลใหม่
  users[userIndex] = updatedUser

  // ส่งข้อความยืนยันและข้อมูลใหม่กลับไป
  res.json({
    message: 'User updated successfully (via POST)',
    user: updatedUser
  })
})

// ---------------------- ลบข้อมูลผู้ใช้ ----------------------
router.delete('/user/:id', (req, res) => {
  const id = parseInt(req.params.id) // แปลง id จาก URL
  const userIndex = users.findIndex(u => u.id === id) // หาตำแหน่งของ user ที่ต้องการลบ

  // ถ้าไม่เจอ user ที่จะลบ
  if (userIndex === -1) return res.status(404).json({ error: 'User not found' })

  // ใช้ splice เพื่อลบข้อมูลออกจาก array
  const deletedUser = users.splice(userIndex, 1)

  // ส่งข้อความยืนยันและข้อมูลของ user ที่ถูกลบกลับไป
  res.json({ message: 'User deleted successfully', user: deletedUser[0] })
})

// ส่ง router ออกไปให้ไฟล์อื่นเรียกใช้งาน เช่น server.js
module.exports = router

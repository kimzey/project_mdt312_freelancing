
#คำสั่งใช้งาน
client // npm run dev
server // npm start

package ที่ใช้ #ลงก่อน!!

#client{
    "axios": "^1.6.1",
    "dotenv": "^16.3.1",
    "html-to-react": "^1.7.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-quill": "^2.0.0",
    "react-router-dom": "^6.18.0",
    "sweetalert2": "^11.9.1"
}
#server{
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-fileupload": "^1.4.2",
    "express-jwt": "^8.4.1",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.0.0",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1",
    "nodemon": "^3.0.1",
    "slugify": "^1.6.6",
    "uuid": "^9.0.1"
}


#API

http://localhost:5050/api/create  ใช้ method post สำหรับสร้าง user

http://localhost:5050/api/users ใช้ method get สำหรับดึงข้อมูล user ทั้งหมด

http://localhost:5050/api/user/username ใช้ method get สำหรับดึงข้อมูล user ตาม username (ต้องใส่ username ลงไปใน path)

http://localhost:5050/api/user/username ใช้ method delete สำหรับลบข้อมูล user ที่ต้องการ (ต้องใส่ username ลงไปใน path)

http://localhost:5050/api/user/username ใช้ method put สำหรับ update ข้อมูล user ที่ต้องการ (ต้องใส่ username ลงไปใน path และ ใส่ข้อมูลทื่ต้องการจะ update ลงไปใน body)

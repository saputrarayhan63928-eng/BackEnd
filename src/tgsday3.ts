import express, {type Request, type Response } from 'express';
import dotenv from 'dotenv'


dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded ({extended: true}))

let users = [
  { id: 1, nama: "Ujang",  email:"ujang@gmail.com",status: "Admin", role:"Maneger"   },
  { id: 2, nama: "Haikal", email:"haikal@gmail.com" , status : "User", role:"Cassier" },
  { id: 3, nama: "MuZaky",email:"muzaky@gmail.com" , status : "Moderator", role:"Manajement" }
];

app.get('/', (_req: Request, res: Response) =>{
    res.json({
         message: "Selamat Datang di  Api Ecomers",
         hari: 3,
         status: "server hidup!"
    })
})

app.get('/api/users' , (_req: Request, res: Response) => {
  res.json({
    success: true,
    jumlah: users.length,
    data: users
  });
});

app.get('/api/users/:id', (req: Request, res: Response) =>{
    const id = parseInt(req.params.id as string)
    const user = users.find(p => p.id === id)

    if(!user){
        return res.status(404).json({
            success: false,
            message: "User Tidak di Temukan"
        })
    }

    res.json({
        success:true,
        data: user
    })
})

app.get('/api/users/search', (req: Request, res: Response) => {
    const {name} = req.query

    let result = users

    if(name) {
        result = result.filter(p => p.nama.toLocaleLowerCase().includes((name as string).toLocaleLowerCase())
    )
    }


    res.json({
        success:true,
        filtered_result: result
    })
})

app.post('/api/users', (req:Request,res:Response) => {
    const {nama, email, status, role} = req.body

    const newUser = {
        id: users.length + 1,
        nama,
        email,
        status,
        role
    }

    users.push(newUser)

    res.status(201).json({
        success: true,
        message: "User Berhasil di Tambahkan",
        data: newUser
    })
})

app.put('/api/users/:id', (req:Request,res:Response) =>{
    const id = parseInt(req.params.id as string)
    const index = users.findIndex(p => p.id === id)

    if (index === -1){
        return res.status(404).json({success: false, message:"User Tidak Ada"})  
    }

    users[index] = {...users[index],...req.body}

    res.json({
    success: true,
    message: "user berhasil diupdate",
    data: users[index]
    })
})

app.delete('/api/users/:id', (req:Request,res:Response) => {
    const id = parseInt(req.params.id as string)
    const index = users.findIndex(p => p.id === id)

    if(index === -1){
        return res.status(404).json({ success: false, message: "User tidak ada" })
    }

    const deleted = users.splice(index,1)

    res.json({
    success: true,
    message: "User berhasil dihapus",
    data: deleted[0]
  })
})

app.listen(PORT, () => {
  console.log(`Server jalan → http://localhost:${PORT}`);
  console.log(`Coba buka semua route di atas pakai Postman!`);
});
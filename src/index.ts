import express, {type Request, type Response } from 'express';
import dotenv from 'dotenv'


dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded ({extended: true}))

let products = [
  { id: 1, nama: "Laptop Gaming", deskripsi: "Intel i7, RTX 3060", harga: 15000000 },
  { id: 2, nama: "Keyboard Mekanikal", deskripsi: "Blue Switch, RGB", harga: 800000 },
  { id: 3, nama: "Mouse Wireless", deskripsi: "Ergonomic, Silent Click", harga: 300000 }
];

app.get('/', (_req: Request, res: Response) =>{
    res.json({
         message: "Selamat Datang di  Api Ecomers",
         hari: 3,
         status: "server hidup!"
    })
})

app.get('/api/products', (_req: Request, res: Response) => {
  res.json({
    success: true,
    jumlah: products.length,
    data: products
  });
});

app.get('/api/products/:id', (req: Request, res: Response) =>{
    const id = parseInt(req.params.id as string)
    const product = products.find(p => p.id === id)

    if(!product){
        return res.status(404).json({
            success: false,
            message: "Product Tidak di Temukan"
        })
    }

    res.json({
        success:true,
        data: product
    })
})

app.get('/api/search', (req: Request, res: Response) => {
    const {name, max_price} = req.query

    let result = products

    if(name) {
        result = result.filter(p => p.nama.toLocaleLowerCase().includes((name as string).toLocaleLowerCase())
    )
    }

    if(max_price){
        result = result.filter(p => p.harga <= Number(max_price))
    }

    res.json({
        success:true,
        filtered_result: result
    })
})

app.post('/api/products', (req:Request,res:Response) => {
    const {nama, deskripsi, harga} = req.body

    const newProduct = {
        id: products.length + 1,
        nama,
        deskripsi,
        harga: Number(harga)
    }

    products.push(newProduct)

    res.status(201).json({
        success: true,
        message: "Produk Berhasil di Tambahkan",
        data: newProduct
    })
})

app.put('/api/products/:id', (req:Request,res:Response) =>{
    const id = parseInt(req.params.id as string)
    const index = products.findIndex(p => p.id === id)

    if (index === -1){
        return res.status(404).json({success: false, message:"Product Tidak Ada"})  
    }

    products[index] = {...products[index],...req.body}

    res.json({
    success: true,
    message: "Produk berhasil diupdate",
    data: products[index]
    })
})

app.delete('/api/products/:id', (req:Request,res:Response) => {
    const id = parseInt(req.params.id as string)
    const index = products.findIndex(p => p.id === id)

    if(index === -1){
        return res.status(404).json({ success: false, message: "Produk tidak ada" })
    }

    const deleted = products.splice(index,1)

    res.json({
    success: true,
    message: "Produk berhasil dihapus",
    data: deleted[0]
  })
})

app.listen(PORT, () => {
  console.log(`Server jalan → http://localhost:${PORT}`);
  console.log(`Coba buka semua route di atas pakai Postman!`);
});
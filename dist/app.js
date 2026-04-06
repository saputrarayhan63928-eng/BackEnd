import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import productRoutes from './routes/product.route';
import { errorHandler } from './middlewares/error.handler';
import categoryRoutes from './routes/category.route';
import transactionRouter from './routes/transaction.route';
import authRouter from './routes/auth.route';
const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/public/uploads', express.static(path.resolve('public/uploads')));
// Custom middleware (dari Hari 4)
app.use((req, res, next) => {
    req.startTime = Date.now();
    const apiKey = req.headers['x-api-key'];
    if (!apiKey)
        return res.status(401).json({ success: false, message: 'Kirim header X-API-Key' });
    req.apiKey = apiKey;
    next();
});
// Routes
app.get('/', (req, res) => {
    const waktu = Date.now() - (req.startTime || 0);
    res.json({ message: `Halo pemilik API Key: ${req.apiKey}! Hari 5 – MVC E-Commerce + Service`, waktu_proses: `${waktu}ms` });
});
app.use('/api/v1/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/transaction', transactionRouter);
app.use('/api/v1', authRouter);
// Error handler harus di paling bawah!
// Middleware error handling dengan 4 parameter (`err, req, res, next`) harus selalu 
// diletakkan PALING AKHIR di antara semua middleware dan route lainnya. 
// Ini memastikan bahwa semua error dari route atau middleware sebelumnya 
// dapat ditangkap dan diproses secara terpusat.
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map
import multer from "multer";
import fs from "fs";
import path from "path";
import { type Request } from "express";

const uploadDir = path.resolve("public/uploads");

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir)
    },
    filename: (_req, file, cb) =>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
})

const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

export const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024}, // itu maksudnya  max 2 mb
    fileFilter: fileFilter
})

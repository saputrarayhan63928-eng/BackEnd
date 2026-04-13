import { type Request, type Response, type NextFunction } from "express";
import { ProductServiceV2 } from "../services/product.service";
export declare const getAllProducts: (req: Request, res: Response, next: NextFunction) => void;
export declare const getProductById: (req: Request, res: Response, next: NextFunction) => void;
export declare const create: (req: Request, res: Response, next: NextFunction) => void;
export declare const show: (req: Request, res: Response, next: NextFunction) => void;
export declare const createProduct: (req: Request, res: Response, next: NextFunction) => void;
export declare const updateProduct: (req: Request, res: Response, next: NextFunction) => void;
export declare const deleteProduct: (req: Request, res: Response, next: NextFunction) => void;
export declare class ProductControllerV2 {
    private productService;
    constructor(productService: ProductServiceV2);
    getProducts: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getProduct: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createProduct: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateProduct: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteProduct: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=product.controller.d.ts.map
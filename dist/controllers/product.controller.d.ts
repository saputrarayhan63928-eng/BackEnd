import type { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/product.service";
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getProducts: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getProduct: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    createProduct: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    updateProduct: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteProduct: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getStats: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=product.controller.d.ts.map
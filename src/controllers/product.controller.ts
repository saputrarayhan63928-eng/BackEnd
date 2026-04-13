import { type Request, type Response, type NextFunction } from "express";
import { ProductServiceV2 } from "../services/product.service";
// import { ProductService, ProductServiceV2 } from "../services/product.service";
// import { asyncHandler } from "../utils/async.handler";
// import { successResponse } from "../utils/response";



// export const getAllProducts = asyncHandler(
//   async (req: Request, res: Response) => {
//     const page = Number(req.query.page ?? req.body.page) || 1;
//     const limit = Number(req.query.limit ?? req.body.limit) || 10;
//     const name = (req.query.name ?? req.body.search?.name ?? req.body.name) as
//       | string
//       | undefined;
//     const maxPriceValue =
//       req.query.maxPrice ?? req.body.search?.maxPrice ?? req.body.maxPrice;
//     const sortBy = (req.query.sortBy ?? req.body.sortBy) as string | undefined;
//     const sortOrderValue = (req.query.sortOrder ??
//       req.body.sortOrder) as string | undefined;
//     const sortOrder =
//       sortOrderValue === "asc" || sortOrderValue === "desc"
//         ? sortOrderValue
//         : undefined;
//     const search =
//       name || maxPriceValue !== undefined
//         ? {
//             ...(name ? { name } : {}),
//             ...(maxPriceValue !== undefined
//               ? { maxPrice: Number(maxPriceValue) }
//               : {}),
//           }
//         : undefined;
//     const params: {
//       page: number;
//       limit: number;
//       search?: { name?: string; maxPrice?: number };
//       sortBy?: string;
//       sortOrder?: "asc" | "desc";
//     } = {
//       page,
//       limit,
//     };

//     if (search) params.search = search;
//     if (sortBy) params.sortBy = sortBy;
//     if (sortOrder) params.sortOrder = sortOrder;

//     //  panggil service
//     const result = await ProductService.getAll(params);

//     //  kirim response dgn metadata pagination
//     // gunakan utility successResponse yg udh ada di src/utils/response.ts
//     const pagination = {
//       page: result.currentPage,
//       limit: limit,
//       total: result.totalItems,
//     };
//     return successResponse(
//       res,
//       "Daftar pruduct berhasil di ambil",
//       result.products,
//       pagination,
//     );
//     //   const products = await ProductService.getAll();
//     //   return successResponse(res, 'Daftar produk' , products);
//   },
// );

// // export const index = asyncHandler(async (_req: Request, res: Response) => {
// //   const products = await ProductService.getAll();
// //   return successResponse(res, "List Products", products);
// // });

// export const getProductById = asyncHandler(
//   async (req: Request, res: Response) => {
//     const id = Number(req.params.id);
//     const product = await ProductService.getById(id);

//     return successResponse(res, "Produk ditemukan", product);
//   },
// );

// export const create = asyncHandler(async (req: Request, res: Response) => {
//   const product = await ProductService.create({
//     ...req.body,
//     price: Number(req.body.price),
//     stock: Number(req.body.stock),
//   });

//   return successResponse(res, "Product created", product, null, 201);
// });

// export const show = asyncHandler(async (req: Request, res: Response) => {
//   const id = Number(req.params.id);
//   const product = await ProductService.getById(id);

//   return successResponse(res, "Product detail", product);
// });

// export const createProduct = asyncHandler(
//   async (req: Request, res: Response) => {
//     const file = req.file;

//     if (!file) {
//       return res.status(400).json({ message: "Image is required" });
//     }

//     const imageUrl = `/public/uploads/${file.filename}`;

//     const productData = {
//       ...req.body,
//       price: Number(req.body.price),
//       stock: req.body.stock !== undefined ? Number(req.body.stock) : 0,
//       categoryId:
//         req.body.categoryId !== undefined
//           ? Number(req.body.categoryId)
//           : undefined,
//       image: imageUrl,
//     };

//     const product = await ProductService.create(productData);
//     return successResponse(
//       res,
//       "Produk berhasil ditambahkan",
//       product,
//       null,
//       201,
//     );
//   },
// );

// export const updateProduct = asyncHandler(
//   async (req: Request, res: Response) => {
//     const id = Number(req.params.id);
//     const product = await ProductService.update(id, {
//       ...req.body,
//       price: req.body.price !== undefined ? Number(req.body.price) : undefined,
//       stock: req.body.stock !== undefined ? Number(req.body.stock) : undefined,
//       categoryId:
//         req.body.categoryId !== undefined
//           ? Number(req.body.categoryId)
//           : undefined,
//     });

//     return successResponse(res, "Produk berhasil diupdate", product);
//   },
// );

// export const deleteProduct = asyncHandler(
//   async (req: Request, res: Response) => {
//     const id = Number(req.params.id);
//     const product = await ProductService.delete(id);

//     return successResponse(res, "Produk berhasil dihapus", product);
//   },
// );

// export const searchProducts = asyncHandler(
//   async (req: Request, res: Response) => {
//     const { name, max_price } = req.query;
//     const products = await ProductService.search(
//       name as string,
//       max_price ? Number(max_price) : undefined,
//     );

  //   return successResponse(res, "Hasil pencarian", products);
  // },
// );


export class ProductControllerV2{
  private productService: ProductServiceV2

  constructor(productService : ProductServiceV2){
    this.productService=productService
  }
  // Arrow function untuk binding 'this' otomatis
  getProducts = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.productService.getAllProducts();
      res.json({
        success: true,
        data: products
      });
    } catch (error) {
      next(error);
    }
  }

  getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id as string);
      const product = await this.productService.getProductById(id);
      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await this.productService.createProduct(req.body);
      res.status(201).json({
        success: true,
        data: product,
        message: 'Product created successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id as string);
      const product = await this.productService.updateProduct(id, req.body);
      res.json({
        success: true,
        data: product,
        message: 'Product updated successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id as string);
      await this.productService.deleteProduct(id);
      res.json({
        success: true,
        message: 'Product deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}
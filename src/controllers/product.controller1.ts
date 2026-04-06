import { type Request, type Response } from "express";
import { ProductService } from "../services/product.service";
import { asyncHandler } from "../utils/async.handler";
import { successResponse } from "../utils/response";

export const getAllProducts = asyncHandler(
  async (req: Request, res: Response) => {
    //  ambil query params dgn default value
    const page = Number(req.body.page) || 1;
    const limit = Number(req.body.limit) || 10;
    const search = req.body.search as any;
    const sortBy = req.body.search as string;
    const sortOrder = req.body.sortOrder as "asc" | "desc";
    //  panggil service
    const result = await ProductService.getAll({
      page,
      limit,
      search,
      sortBy,
      sortOrder,
    });

    //  kirim response dgn metadata pagination
    // gunakan utility successResponse yg udh ada di src/utils/response.ts
    const pagination = {
      page: result.currentPage,
      limit: limit,
      total: result.totalItems,
    };
    return successResponse(
      res,
      "Daftar pruduct berhasil di ambil",
      result.products,
      pagination,
    );
    //   const products = await ProductService.getAll();
    //   return successResponse(res, 'Daftar produk' , products);
  },
);

// export const index = asyncHandler(async (_req: Request, res: Response) => {
//   const products = await ProductService.getAll();
//   return successResponse(res, "List Products", products);
// });

export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const product = await ProductService.getById(id);

    return successResponse(res, "Produk ditemukan", product);
  },
);

export const create = asyncHandler(async (req: Request, res: Response) => {
  const product = await ProductService.create({
    ...req.body,
    price: Number(req.body.price),
    stock: Number(req.body.stock),
  });

  return successResponse(res, "Product created", product, null, 201);
});

export const show = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = await ProductService.getById(id);

  return successResponse(res, "Product detail", product);
});

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imageUrl = `/public/uploads/${file.filename}`;

    const productData = {
      ...req.body,
      price: Number(req.body.price),
      stock: req.body.stock !== undefined ? Number(req.body.stock) : 0,
      categoryId:
        req.body.categoryId !== undefined
          ? Number(req.body.categoryId)
          : undefined,
      image: imageUrl,
    };

    const product = await ProductService.create(productData);
    return successResponse(
      res,
      "Produk berhasil ditambahkan",
      product,
      null,
      201,
    );
  },
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const product = await ProductService.update(id, {
      ...req.body,
      price: req.body.price !== undefined ? Number(req.body.price) : undefined,
      stock: req.body.stock !== undefined ? Number(req.body.stock) : undefined,
      categoryId:
        req.body.categoryId !== undefined
          ? Number(req.body.categoryId)
          : undefined,
    });

    return successResponse(res, "Produk berhasil diupdate", product);
  },
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const product = await ProductService.delete(id);

    return successResponse(res, "Produk berhasil dihapus", product);
  },
);

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

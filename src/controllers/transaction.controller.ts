import type { NextFunction, Request, Response } from "express";
import { TransactionService } from "../services/transaction.service";
import { errorResponse, successResponse } from "../utils/response";

export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  listTransactions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const userIdValue = req.query.userId;
      const minTotalValue = req.query.minTotal;
      const maxTotalValue = req.query.maxTotal;
      const sortBy = req.query.sortBy as string | undefined;
      const sortOrderValue = req.query.sortOrder as string | undefined;
      const sortOrder =
        sortOrderValue === "asc" || sortOrderValue === "desc"
          ? sortOrderValue
          : undefined;

      const result = await this.transactionService.getAllTransactions({
        page,
        limit,
        ...(userIdValue !== undefined ||
        minTotalValue !== undefined ||
        maxTotalValue !== undefined
          ? {
              search: {
                ...(userIdValue !== undefined ? { userId: Number(userIdValue) } : {}),
                ...(minTotalValue !== undefined
                  ? { minTotal: Number(minTotalValue) }
                  : {}),
                ...(maxTotalValue !== undefined
                  ? { maxTotal: Number(maxTotalValue) }
                  : {}),
              },
            }
          : {}),
        ...(sortBy ? { sortBy } : {}),
        ...(sortOrder ? { sortOrder } : {}),
      });

      return successResponse(
        res,
        "Daftar transaksi berhasil diambil",
        result.transactions,
        {
          page: result.currentPage,
          limit,
          total: result.totalItems,
        },
      );
    } catch (error) {
      next(error);
    }
  };

  checkout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user?.id) {
        return errorResponse(res, "Unauthorized", 401);
      }

      const items = Array.isArray(req.body.item) ? req.body.item : [];
      const result = await this.transactionService.checkout(
        req.user.id,
        items.map((item: { productId: unknown; quantity: unknown }) => ({
          productId: Number(item.productId),
          quantity: Number(item.quantity),
        })),
      );

      return successResponse(res, "Checkout Success", result);
    } catch (error) {
      next(error);
    }
  };

  getDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.transactionService.getTransactionById(
        Number(req.params.id),
      );

      if (!result) {
        return errorResponse(res, "Transaction not found", 404);
      }

      return successResponse(res, "Get transaction request sucses", result);
    } catch (error) {
      next(error);
    }
  };
}

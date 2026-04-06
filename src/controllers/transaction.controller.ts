import type { Request, Response } from "express";
import { TransactionService } from "../services/transaction.service";
import { errorResponse, successResponse } from "../utils/response";

export const listTransactions = async (req: Request, res: Response) => {
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

    const params: {
      page: number;
      limit: number;
      search?: { userId?: number; minTotal?: number; maxTotal?: number };
      sortBy?: string;
      sortOrder?: "asc" | "desc";
    } = { page, limit };

    if (
      userIdValue !== undefined ||
      minTotalValue !== undefined ||
      maxTotalValue !== undefined
    ) {
      params.search = {};

      if (userIdValue !== undefined) params.search.userId = Number(userIdValue);
      if (minTotalValue !== undefined) {
        params.search.minTotal = Number(minTotalValue);
      }
      if (maxTotalValue !== undefined) {
        params.search.maxTotal = Number(maxTotalValue);
      }
    }

    if (sortBy) params.sortBy = sortBy;
    if (sortOrder) params.sortOrder = sortOrder;

    const result = await TransactionService.getAll(params);
    return successResponse(res, "Daftar transaksi berhasil diambil", result.transactions, {
      page: result.currentPage,
      limit,
      total: result.totalItems,
    });
  } catch (error) {
    return errorResponse(res, `Error retrieval: ${error}`, 500);
  }
};

export const checkout = async (req: Request, res: Response) => {
  try {
    const { item } = req.body;

    if (!req.user?.id) {
      return errorResponse(res, "Unauthorized", 401);
    }

    const result = await TransactionService.checkout(req.user.id, item);
    return successResponse(res, "Checkout Success", result, null, 200);
  } catch (error) {
    return errorResponse(res, `Checkout failed: ${error}`, 500);
  }
};

export const getDetail = async (req: Request, res: Response) =>{
    try{
        const {id} = req.params
        const result = await TransactionService.getTransactionById(Number(id))
        if(!result) return errorResponse(res, "Transaction not found", 404)
        return successResponse(res, "Get transaction request sucses", result,null,200)
    } catch(error){
        return errorResponse(res, `Error retrieval: ${error}`, 500) 
    }
}

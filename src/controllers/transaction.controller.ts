import type { Request, Response } from "express";
import { TransactionService } from "../services/transaction.service";
import { errorResponse, successResponse } from "../utils/response";

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

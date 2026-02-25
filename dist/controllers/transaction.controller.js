import { TransactionService } from "../services/transaction.service";
import { errorResponse, successResponse } from "../utils/response";
export const checkout = async (req, res) => {
    try {
        const { userId, item } = req.body;
        const result = await TransactionService.checkout(userId, item);
        return successResponse(res, "Checkout Sucses", result, null, 200);
    }
    catch (error) {
        return errorResponse(res, "Checkout failed", 500);
    }
};
export const getDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await TransactionService.getTransactionById(Number(id));
        if (!result)
            return errorResponse(res, "Transaction not found", 404);
        return successResponse(res, "Get transaction request sucses", result, null, 200);
    }
    catch (error) {
        return errorResponse(res, "Error retrieval", 500);
    }
};
//# sourceMappingURL=transaction.controller.js.map
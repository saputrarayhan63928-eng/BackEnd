import type { NextFunction, Request, Response } from "express";
import { TransactionService } from "../services/transaction.service.js";
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    listTransactions: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    checkout: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getDetail: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=transaction.controller.d.ts.map
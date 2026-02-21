import { validationResult, type ValidationChain } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';
import { errorResponse } from './response';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Jalankan semua rules validasi secara paralel
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next(); // Lanjut ke controller jika tidak ada error
    }

    // Format error agar rapi
    const errorList = errors.array().map((err: any) => ({
      field: err.path || err.param || 'unknown',
      message: err.msg
    }));

    // Return response error 400
    return errorResponse(res, 'Validasi gagal', 400, errorList);
  };
};
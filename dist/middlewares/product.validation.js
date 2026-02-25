import { body, param, validationResult } from 'express-validator';
import {} from 'express';
import { errorResponse } from '../utils/response';
export const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (errors.isEmpty())
            return next();
        const errorList = errors.array().map((err) => ({
            field: err.path || err.param || 'unknown',
            message: err.msg
        }));
        return errorResponse(res, 'Validasi gagal', 400, errorList);
    };
};
export const createProductValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name wajib diisi')
        .isLength({ min: 3 }).withMessage('Name minimal 3 karakter'),
    body('description')
        .optional()
        .isString().withMessage('Description harus string'),
    body('price')
        .notEmpty().withMessage('Price wajib diisi')
        .isFloat({ gt: 0 }).withMessage('Price harus angka > 0'),
    body('stock')
        .notEmpty().withMessage('Stock wajib diisi')
        .isInt({ min: 0 }).withMessage('Stock harus integer >= 0')
];
export const getProductByIdValidation = [
    param('id').isInt({ min: 1 }).withMessage('ID harus angka positif')
];
//# sourceMappingURL=product.validation.js.map
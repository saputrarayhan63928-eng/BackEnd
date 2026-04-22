import { validationResult } from 'express-validator';
import { errorResponse } from './response.js';
export const validate = (validations) => {
    return async (req, res, next) => {
        // Jalankan semua rules validasi secara paralel
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next(); // Lanjut ke controller jika tidak ada error
        }
        // Format error agar rapi
        const errorList = errors.array().map((err) => ({
            field: err.path || err.param || 'unknown',
            message: err.msg
        }));
        // Return response error 400
        return errorResponse(res, 'Validasi gagal', 400, errorList);
    };
};
//# sourceMappingURL=validate.js.map
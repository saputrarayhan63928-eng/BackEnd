import {} from 'express';
import { errorResponse } from '../utils/response.js';
import { NODE_ENV } from '../utils/env.js';
export const errorHandler = (err, _req, res, _next) => {
    console.error('ERROR:', err.message);
    const statusCode = err.message.includes('tidak ditemukan') ? 404 : 400;
    errorResponse(res, err.message || 'Terjadi kesalahan server', statusCode, NODE_ENV === 'development' ? { stack: err.stack } : null);
};
//# sourceMappingURL=error.handler.js.map
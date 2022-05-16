import { allowedOrigins } from '../config/allowedOrigin';

export const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  console.log('[*1.credentials] req.headers.origin', origin);
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', true);
  }
  next();
};

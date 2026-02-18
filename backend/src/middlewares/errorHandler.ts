import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
  status?: string;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const errorResponse = {
    status: 'error' as const,
    message: err.message || 'Internal server error',
    statusCode: statusCode,
    timestamp: new Date().toISOString(),
  };

  // Log l'erreur en développement
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err);
  }

  res.status(statusCode).json(errorResponse);
};

export default errorHandler;

import { Request, Response } from 'express';
import type { HealthResponseData } from './types.js';

const getHealth = (req: Request, res: Response): void => {
  const responseData: HealthResponseData = {
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  };

  res.status(200).json(responseData);
};

export default {
  getHealth,
};

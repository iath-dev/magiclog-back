import { Request } from 'express';
import { JwtPayload } from './user.types';

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request... ${req.method} ${req.originalUrl}`);
    console.log(`Headers: ${JSON.stringify(req.headers)}`);
    console.log(`Body: ${JSON.stringify(req.body)}`);
    console.log(`Query: ${JSON.stringify(req.query)}`);
    console.log(`Params: ${JSON.stringify(req.params)}`);
    console.log(`IP: ${req.ip}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log(`User Agent: ${req.headers['user-agent']}`);

    console.log('------ Request Details End ---');

    next();
  }
}

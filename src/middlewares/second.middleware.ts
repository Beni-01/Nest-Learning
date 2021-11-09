import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request,Response } from 'express';

@Injectable()
export class SecondMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    if(req.params.id){
      console.log({message:'je suis middleware'})
      next()
    }
      
    console.log({message:'je suis middleware'})
    next();
  }
}

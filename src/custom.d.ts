declare namespace Express {
  export interface Request {
    context?: {
      [key: string]: any;
    };
  }
}

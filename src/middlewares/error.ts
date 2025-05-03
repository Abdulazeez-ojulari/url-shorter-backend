import { Request, Response, NextFunction } from "express";

const errorMiddleware = function (handler: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res);
    } catch (err: any) {
      console.log(err.message);
      res
        .status(500)
        .json({
          responseCode: "500",
          responseMessage: "something went wrong.",
        });
      next();
    }
  };
};

export default errorMiddleware;

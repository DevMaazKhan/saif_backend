const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(async (err) => {
    next(err);
  });

export default asyncHandler;

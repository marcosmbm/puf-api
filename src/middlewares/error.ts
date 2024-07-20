import type { Context, Next } from "koa";

const errorMiddleware = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof Error) {
      ctx.status = 400;
      ctx.body = {
        message: err.message,
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        message: "Server error",
      };
    }
  }
};

export { errorMiddleware };

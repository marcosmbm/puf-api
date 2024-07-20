import type { Context, Next } from "koa";

export const usersList = (ctx: Context, next: Next) => {
  ctx.body = "list";
};

export const create = (ctx: Context, next: Next) => {
  ctx.body = "created";
};

export const find = (ctx: Context, next: Next) => {
  ctx.body = "find";
};

export const update = (ctx: Context, next: Next) => {
  ctx.body = "update";
};

export const remove = (ctx: Context, next: Next) => {
  ctx.body = "remove";
};

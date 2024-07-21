import { prisma } from "@/data";

import type { Context, Next } from "koa";

export const usersList = async (ctx: Context, next: Next) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
  ctx.body = users;
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

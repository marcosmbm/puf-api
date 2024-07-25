import type { Context, Next } from "koa";
import jwt from "jsonwebtoken";

import {
  compareHash,
  generateHashPassword,
  getCredentialsByAuthHeader,
} from "./services";

import { register, findFirst, findMany } from "./model";

export const usersList = async (ctx: Context, next: Next) => {
  const users = await findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
    orderBy: {
      name: "asc",
    },
  });
  ctx.body = users;
};

export const create = async (ctx: Context, next: Next) => {
  const data = ctx.request.body as {
    name: string;
    email: string;
    password: string;
  };

  const { name, email, password } = data;

  const hash = generateHashPassword(password);

  const user = await register({
    data: {
      email,
      name,
      password: hash,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  ctx.body = user;
};

export const login = async (ctx: Context, next: Next) => {
  const headerAuthorization = ctx.headers.authorization ?? "";
  const [email, password] = getCredentialsByAuthHeader(headerAuthorization);

  const user = await findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new Error("Email/password is invalid");
  }

  const passwordIsCorrect = compareHash(password, user.password);

  if (!passwordIsCorrect) {
    throw new Error("Email/password is invalid [1]");
  }

  const token = jwt.sign(
    { email: user.email, id: user.id },
    process.env.JWT_SECRET as string,
    {
      subject: user.id,
      expiresIn: "30d",
    },
  );

  ctx.body = {
    name: user.name,
    email: user.email,
    token,
  };
};

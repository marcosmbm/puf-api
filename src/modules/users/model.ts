import { prisma } from "@/data";

export const findMany = prisma.user.findMany;
export const register = prisma.user.create;
export const findFirst = prisma.user.findFirst;

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const getAuth = () => {
  const { prisma } = require("./prisma"); // loaded at runtime
  return betterAuth({
    database: prismaAdapter(prisma, { provider: "sqlite" }),
    emailAndPassword: { 
    enabled: true, 
  },
  });
  
};

export const auth = getAuth();

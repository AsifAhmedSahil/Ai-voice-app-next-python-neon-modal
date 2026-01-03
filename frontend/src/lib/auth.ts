/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
// src/lib/auth.ts
import { betterAuth, type User } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { Polar } from "@polar-sh/sdk";
import {
  polar,
  checkout,
  portal,
  usage,
  webhooks,
} from "@polar-sh/better-auth";
import { env } from "~/env";
import { PrismaClient } from "@prisma/client";
import { db } from "~/server/db";

const polarClient = new Polar({
  accessToken: env.POLAR_ACCESS_TOKEN,

  server: "sandbox",
});

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
  },

  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      getCustomerExternalId: ({ user }: { user: User }) => user.id,
      use: [
        checkout({
          products: [
            {
              productId: "0509872e-f1ef-4cb0-8492-edc8b8de859e",
              slug: "small",
            },
            {
              productId: "fd476fe1-a442-41ac-aac0-f32f7cc3b50f",
              slug: "medium",
            },
            {
              productId: "32ebabba-115c-4a62-8be2-42a9d510b359",
              slug: "large",
            },
          ],
          successUrl: "/dashboard",
          authenticatedUsersOnly: true,
        }),
        portal(),
        webhooks({
          secret: env.POLAR_WEBHOOK_SECRET,
          onOrderPaid: async (order) => {
  const userId = order.data.customer.externalId;
  console.log("externalId:", order.data.customer.externalId);


  if (!userId) {
    throw new Error("No externalId found");
  }

  let creditsToAdd = 0;

  switch (order.data.productId) {
    case "c0590765-eac9-4c0b-99d2-fc8f98920eba":
      creditsToAdd = 50;
      break;
    case "78276150-2dd9-437b-8fe9-8671df481b66":
      creditsToAdd = 200;
      break;
    case "0f81ee54-c80a-4907-9592-073b0b606af4":
      creditsToAdd = 400;
      break;
  }

  await db.user.update({
    where: { id: userId },
    data: {
      credits: {
        increment: creditsToAdd,
      },
    },
  });
}

        }),
      ],
    }),
  ],
});

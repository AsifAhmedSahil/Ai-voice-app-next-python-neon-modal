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
              productId: "2661dbb5-ee8e-4b65-b513-26261666dbc4",
              slug: "small",
            },
            {
              productId: "610e40b4-752f-42b7-9202-ba28f956e56b",
              slug: "medium",
            },
            {
              productId: "26746c00-dadd-4287-9afc-8e1ecef40b01",
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
    case "2661dbb5-ee8e-4b65-b513-26261666dbc4":
      creditsToAdd = 50;
      break;
    case "610e40b4-752f-42b7-9202-ba28f956e56b":
      creditsToAdd = 200;
      break;
    case "26746c00-dadd-4287-9afc-8e1ecef40b01":
      creditsToAdd = 500;
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

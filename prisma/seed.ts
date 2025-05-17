import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // 1. Create a User with hashed password
  const hashedPassword = await bcrypt.hash("password123", 10);

  const user = await prisma.user.create({
    data: {
      email: "nalindalal2004@gmail.com",
      password: hashedPassword,
      sites: {
        create: [
          {
            url: "https://google.com",
            interval: 15,
            email1: "nalindalal2004@gmail.com",
            email2: "0105CS221113@oriental.ac.in",
            lastStatus: 200,
            logs: {
              create: [
                {
                  status: 200,
                },
                {
                  status: 503,
                },
              ],
            },
            sessions: {
              create: [
                {
                  events: {
                    create: [
                      {
                        type: "pageview",
                        data: { page: "/" },
                      },
                      {
                        type: "click",
                        data: { elementId: "signup-button" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log("Seeded user with monitored site:", user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

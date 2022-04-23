import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const firstRecord = await prisma.integer.create({
    data: {
      integer: 1,
    },
  });

  // This is well outside the limit for a Postgres integer type.
  const newIntegerValue = 32e100;

  // This update should throw an error, ideally an "integer out of
  // range" error, as Postgres would. Instead, it crashes the
  // prisma client.
  await prisma.integer.update({
    where: {
      id: firstRecord.id,
    },
    data: {
      integer: 32e100,
    },
  });
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });

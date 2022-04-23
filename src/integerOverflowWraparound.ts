import { PrismaClient } from "@prisma/client";
import assert from "assert";

const prisma = new PrismaClient();

async function main() {
  const record = await prisma.integer.create({
    data: {
      integer: 1,
    },
  });

  // The max value for a PG integer is 2147483647. This value is intentionally
  // too large.
  const newIntegerValue = 2147483649;

  // This update should throw an error -- ideally an "integer out of range" error
  // as postgres would directly. But it throws no error.
  await prisma.integer.update({
    where: {
      id: record.id,
    },
    data: {
      integer: newIntegerValue,
    },
  });

  const updatedRecord = await prisma.integer.findUnique({
    where: {
      id: record.id,
    },
  });

  // Instead, the value is set to the negative wrap-around.
  assert(
    newIntegerValue === updatedRecord?.integer,
    `Expected ${updatedRecord?.integer} to be ${newIntegerValue}`
  );
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

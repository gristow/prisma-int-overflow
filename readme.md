# Prisma Integer Overflows

When working with postgres integer columns, certain javascript numerical values
produce unexpected results or even cause a full client crash.

This repo provides a minimal reproduction of the error.

## To setup:
1. clone the repo
2. npm i
3. setup an empty postgres database/username
4. update .env with the pg database/username info
5. run `npx prisma migrate dev --name init`

## To replicate failures:
1. run `ts-node ./src/integerClientCrash.ts`
2. run `ts-node ./src/integerOverflowWraparound.ts`

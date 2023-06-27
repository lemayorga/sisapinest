// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// const xprisma = prisma.$extends({
//     result: {
//         communPerson: {
//           fullName: {
//             needs: { firstName: true, lastName: true },
//             compute(pers) {
//               return `${pers.firstName.trim()} ${(pers.lastName || '').trim()}`
//             },
//           },
//         },
//    },
// })
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const positions = await prisma.postion.createMany({
    data: [{ id: 'rn' }, { id: 'lpn' }, { id: 'cna' }],
  });
  console.log('Positions Created', positions);

  const status = await prisma.status.createMany({
    data: [{ id: 'open' }, { id: 'closed' }, { id: 'filled' }],
  });

  console.log('Status Created', status);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

import { PrismaClient, Ingredients, OnzaLevel } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear un administrador predeterminado
  const defaultAdminBar = await prisma.adminBar.create({
    data: { adminId: 'Guido', password: 'barzaruma' },
  });
  console.log('Default admin created:', defaultAdminBar);

  // Crear tipos de cócteles
  const drinkTypes = await prisma.drinkType.createMany({
    data: [
      { name: 'Cuba Libre' },
      { name: 'Skill Driver' },
      { name: 'Mojito' },
      { name: 'Caipirinha' },
      { name: 'Caipiroska' },
      { name: 'Tequila Molta Vallarta' },
      { name: 'Tequila Sunrise' },
    ],
  });
  console.log('Drink types created:', drinkTypes);

  // Crear bebidas
  const drinks = await prisma.drink.createMany({
    data: [
      { name: 'Cuba Libre', price: 5.5, drinkTypeId: 1 },
      { name: 'Skill Driver', price: 6.0, drinkTypeId: 2 },
      { name: 'Mojito', price: 6.0, drinkTypeId: 3 },
      { name: 'Caipirinha', price: 5.0, drinkTypeId: 4 },
      { name: 'Caipiroska', price: 6.0, drinkTypeId: 5 },
      { name: 'Tequila Molta Vallarta', price: 6.0, drinkTypeId: 6 },
      { name: 'Tequila Sunrise', price: 6.0, drinkTypeId: 7 },
    ],
  });
  console.log('Drinks created:', drinks);

  // Crear ingredientes para las bebidas
  const drinkIngredients = [
    // Cuba Libre
    { drinkId: 1, ingredient: Ingredients.Ron, amountOz: OnzaLevel.TwoFiveOz }, //2.5 onzas   330mlvaso....   11onzas
    {
      drinkId: 1,
      ingredient: Ingredients.CocaCola, //2onzaz
      amountOz: OnzaLevel.TwoOz,
    },
    {
      drinkId: 1,
      ingredient: Ingredients.JuiceLemon, //2onzaz
      amountOz: OnzaLevel.TwoOz,
    },

    // Skill Driver
    {
      drinkId: 2,
      ingredient: Ingredients.Vodka,
      amountOz: OnzaLevel.ThreeFiveOz,
    }, //3.5onz
    {
      drinkId: 2,
      ingredient: Ingredients.JuiceOrange, //3.5on
      amountOz: OnzaLevel.ThreeFiveOz,
    },
    {
      drinkId: 2,
      ingredient: Ingredients.Granadine, //0.5on
      amountOz: OnzaLevel.CeroFiveOz,
    }, //granadina 0.5

    // Mojito
    { drinkId: 3, ingredient: Ingredients.Ron, amountOz: OnzaLevel.TwoFiveOz }, //2.5onz
    {
      drinkId: 3,
      ingredient: Ingredients.JuiceLemon, //2.5
      amountOz: OnzaLevel.TwoFiveOz,
    },
    { drinkId: 3, ingredient: Ingredients.Soda, amountOz: OnzaLevel.TwoFiveOz }, //2.5

    // Caipirinha
    {
      drinkId: 4,
      ingredient: Ingredients.Aguardiente, //2.5
      amountOz: OnzaLevel.TwoFiveOz,
    },
    {
      drinkId: 4,
      ingredient: Ingredients.JuiceLemon, //2.5
      amountOz: OnzaLevel.TwoFiveOz, //soda 2.5
    },
    {
      drinkId: 4,
      ingredient: Ingredients.Soda, //2.5
      amountOz: OnzaLevel.TwoFiveOz,
    },

    // Caipiroska
    {
      drinkId: 5,
      ingredient: Ingredients.Vodka,
      amountOz: OnzaLevel.TwoFiveOz,
    }, //2.5
    {
      drinkId: 5,
      ingredient: Ingredients.JuiceLemon, //2.5
      amountOz: OnzaLevel.TwoFiveOz,
    },
    {
      drinkId: 5,
      ingredient: Ingredients.Soda, //2.5
      amountOz: OnzaLevel.TwoFiveOz,
    },
    // Tequila Molta Vallarta
    {
      drinkId: 6,
      ingredient: Ingredients.Tequila,
      amountOz: OnzaLevel.ThreeFiveOz,
    }, //3.5
    {
      drinkId: 6,
      ingredient: Ingredients.JuiceOrange, //3.5
      amountOz: OnzaLevel.ThreeFiveOz,
    },
    {
      drinkId: 6,
      ingredient: Ingredients.Granadine,
      amountOz: OnzaLevel.CeroFiveOz, //0.5 onz
    },
    // Tequila Sunrise
    {
      drinkId: 7,
      ingredient: Ingredients.Tequila,
      amountOz: OnzaLevel.ThreeFiveOz,
    }, //3.5
    {
      drinkId: 7,
      ingredient: Ingredients.JuiceLemon, //juice lemon 3.5///
      amountOz: OnzaLevel.ThreeFiveOz,
    },
    {
      drinkId: 7,
      ingredient: Ingredients.Granadine, //0.5on
      amountOz: OnzaLevel.CeroFiveOz,
    },
  ];
  await prisma.drinkIngredient.createMany({ data: drinkIngredients });
  console.log('Drink ingredients created.');

  // Crear órdenes
  const orders = [
    await prisma.order.create({ data: { drinkId: 1, origin: 'Alexa' } }),
    await prisma.order.create({ data: { drinkId: 2, origin: 'AppWeb' } }),
  ];
  console.log('Orders created:', orders);

  // Crear porciones servidas
  const portionsServed = await prisma.portionServed.createMany({
    data: [
      {
        drinkId: 1,
        orderId: 1,
        ingredient: Ingredients.Ron,
        amountOz: OnzaLevel.TwoOz,
      },
      {
        drinkId: 1,
        orderId: 1,
        ingredient: Ingredients.CocaCola,
        amountOz: OnzaLevel.ThreeOz,
      },
      {
        drinkId: 1,
        orderId: 1,
        ingredient: Ingredients.JuiceLemon,
        amountOz: OnzaLevel.OneOz,
      },
    ],
  });
  console.log('Portions served created.');

  // Crear transacciones
  const transactions = await prisma.transaction.createMany({
    data: [
      { orderId: 1, drinkId: 1, amount: 5.5, statusTrans: 'Completado' },
      { orderId: 2, drinkId: 2, amount: 6.0, statusTrans: 'Pendiente' },
    ],
  });
  console.log('Transactions created:', transactions);
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

-- CreateEnum
CREATE TYPE "Ingredients" AS ENUM ('Ron', 'Vodka', 'Tequila', 'Aguardiente', 'JuiceLemon', 'JuiceOrange', 'CocaCola', 'Granadine', 'Soda', 'WaterTonic');

-- CreateEnum
CREATE TYPE "OnzaLevel" AS ENUM ('CeroFiveOz', 'OneOz', 'OneFiveOz', 'TwoOz', 'TwoFiveOz', 'ThreeOz', 'ThreeFiveOz', 'FourOz', 'FourFiveOz', 'FiveOz', 'FiveFiveOz', 'SixOz', 'SixFiveOz', 'SevenOz', 'SevenFiveOz', 'EightOz', 'EightFiveOz', 'NineOz', 'NineFiveOz', 'TenOz');

-- CreateTable
CREATE TABLE "DrinkType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DrinkType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DrinkIngredient" (
    "id" SERIAL NOT NULL,
    "drinkId" INTEGER NOT NULL,
    "ingredient" "Ingredients" NOT NULL,
    "amountOz" "OnzaLevel" NOT NULL,

    CONSTRAINT "DrinkIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortionServed" (
    "id" SERIAL NOT NULL,
    "drinkId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "ingredient" "Ingredients" NOT NULL,
    "amountOz" "OnzaLevel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PortionServed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminBar" (
    "id" SERIAL NOT NULL,
    "adminId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminBar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Drink" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "imageUrl" TEXT,
    "drinkTypeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Drink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "drinkId" INTEGER NOT NULL,
    "origin" TEXT NOT NULL,
    "statusOrder" TEXT NOT NULL DEFAULT 'En proceso',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "drinkId" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "statusTrans" TEXT NOT NULL DEFAULT 'Pendiente',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DrinkType_name_key" ON "DrinkType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AdminBar_adminId_key" ON "AdminBar"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_orderId_key" ON "Transaction"("orderId");

-- AddForeignKey
ALTER TABLE "DrinkIngredient" ADD CONSTRAINT "DrinkIngredient_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES "Drink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortionServed" ADD CONSTRAINT "PortionServed_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES "Drink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortionServed" ADD CONSTRAINT "PortionServed_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Drink" ADD CONSTRAINT "Drink_drinkTypeId_fkey" FOREIGN KEY ("drinkTypeId") REFERENCES "DrinkType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES "Drink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES "Drink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

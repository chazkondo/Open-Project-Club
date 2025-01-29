/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- Enable pgcrypto extension if needed
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Alter the table to update the id column
ALTER TABLE "User" ALTER COLUMN "id" TYPE uuid USING ("id"::uuid);

ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

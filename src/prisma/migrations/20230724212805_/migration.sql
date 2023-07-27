/*
  Warnings:

  - Added the required column `cubeType` to the `CubeSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CubeSession" ADD COLUMN     "cubeType" TEXT NOT NULL;

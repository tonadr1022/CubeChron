-- DropIndex
DROP INDEX "Solve_cubeSessionId_idx";

-- DropIndex
DROP INDEX "Solve_userId_cubeSessionId_idx";

-- AlterTable
ALTER TABLE "Setting" ALTER COLUMN "cubeType" DROP NOT NULL,
ALTER COLUMN "cubeDisplayDimension" DROP NOT NULL,
ALTER COLUMN "barView" DROP NOT NULL;

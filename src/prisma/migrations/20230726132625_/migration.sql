-- AlterTable
ALTER TABLE "Setting" ALTER COLUMN "cubeDisplayDimension" SET DEFAULT '2D';

-- CreateIndex
CREATE INDEX "Solve_cubeSessionId_idx" ON "Solve"("cubeSessionId");

-- CreateIndex
CREATE INDEX "Solve_userId_cubeSessionId_idx" ON "Solve"("userId", "cubeSessionId");

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Solve" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cubeSessionId" TEXT,
    "scramble" TEXT,
    "cubeType" TEXT,
    "notes" TEXT,
    "dnf" BOOLEAN DEFAULT false,
    "plusTwo" BOOLEAN DEFAULT false,
    "duration" REAL NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Solve_cubeSessionId_fkey" FOREIGN KEY ("cubeSessionId") REFERENCES "CubeSession" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Solve_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Solve" ("createdAt", "cubeSessionId", "cubeType", "dnf", "duration", "id", "notes", "plusTwo", "scramble", "userId") SELECT "createdAt", "cubeSessionId", "cubeType", "dnf", "duration", "id", "notes", "plusTwo", "scramble", "userId" FROM "Solve";
DROP TABLE "Solve";
ALTER TABLE "new_Solve" RENAME TO "Solve";
CREATE INDEX "Solve_userId_idx" ON "Solve"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

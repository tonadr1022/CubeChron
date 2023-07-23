-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CubeSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "notes" TEXT,
    "userId" TEXT,
    CONSTRAINT "CubeSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_CubeSession" ("createdAt", "id", "name", "notes", "updatedAt", "userId") SELECT "createdAt", "id", "name", "notes", "updatedAt", "userId" FROM "CubeSession";
DROP TABLE "CubeSession";
ALTER TABLE "new_CubeSession" RENAME TO "CubeSession";
CREATE INDEX "CubeSession_userId_idx" ON "CubeSession"("userId");
CREATE UNIQUE INDEX "CubeSession_userId_name_key" ON "CubeSession"("userId", "name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

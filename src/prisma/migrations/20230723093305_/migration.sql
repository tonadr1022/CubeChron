-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Setting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "userId" TEXT,
    "focusMode" BOOLEAN NOT NULL DEFAULT false,
    "cubeType" TEXT NOT NULL DEFAULT '333',
    "cubeSessionId" TEXT,
    CONSTRAINT "Setting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Setting" ("createdAt", "cubeSessionId", "cubeType", "focusMode", "id", "updatedAt", "userId") SELECT "createdAt", "cubeSessionId", "cubeType", "focusMode", "id", "updatedAt", "userId" FROM "Setting";
DROP TABLE "Setting";
ALTER TABLE "new_Setting" RENAME TO "Setting";
CREATE UNIQUE INDEX "Setting_userId_key" ON "Setting"("userId");
CREATE INDEX "Setting_userId_idx" ON "Setting"("userId");
CREATE TABLE "new_Solve" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
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
CREATE TABLE "new_CubeSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
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

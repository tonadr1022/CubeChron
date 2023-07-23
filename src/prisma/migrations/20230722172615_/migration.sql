-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Setting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
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
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

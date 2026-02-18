-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "bio" TEXT,
    "profession" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

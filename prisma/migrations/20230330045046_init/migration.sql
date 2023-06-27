-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "commun";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "security";

-- CreateTable
CREATE TABLE "security"."role" (
    "id" SERIAL NOT NULL,
    "code_access" VARCHAR(80) NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "security"."module" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(80) NOT NULL,

    CONSTRAINT "module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "security"."access" (
    "id" SERIAL NOT NULL,
    "code_access" VARCHAR(80) NOT NULL,
    "description" VARCHAR(150),

    CONSTRAINT "access_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "security"."access_on_rol" (
    "rolId" INTEGER NOT NULL,
    "accessId" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT
);

-- CreateTable
CREATE TABLE "security"."user" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(60) NOT NULL,
    "password" VARCHAR(60) NOT NULL,
    "email" VARCHAR(60) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "email_verified" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "security"."user_on_rol" (
    "rolId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "assignedBy" TEXT
);

-- CreateTable
CREATE TABLE "commun"."catalogue" (
    "id" SERIAL NOT NULL,
    "group" VARCHAR(80) NOT NULL,
    "value" VARCHAR(80) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "description" VARCHAR(150),

    CONSTRAINT "catalogue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commun"."company" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "companySuccessorId" INTEGER,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commun"."person" (
    "id" SERIAL NOT NULL,
    "firstname" VARCHAR(80) NOT NULL,
    "lastname" VARCHAR(80),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "email" VARCHAR(60) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commun"."data_person" (
    "id" SERIAL NOT NULL,
    "person_id" INTEGER NOT NULL,
    "catalogue_id" INTEGER NOT NULL,
    "value" VARCHAR(250) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_main" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "data_person_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "role_code_access_key" ON "security"."role"("code_access");

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "security"."role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "module_name_key" ON "security"."module"("name");

-- CreateIndex
CREATE UNIQUE INDEX "access_code_access_key" ON "security"."access"("code_access");

-- CreateIndex
CREATE INDEX "access_on_rol_rolId_accessId_idx" ON "security"."access_on_rol"("rolId", "accessId");

-- CreateIndex
CREATE UNIQUE INDEX "access_on_rol_rolId_accessId_key" ON "security"."access_on_rol"("rolId", "accessId");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "security"."user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "security"."user"("email");

-- CreateIndex
CREATE INDEX "user_on_rol_rolId_userId_idx" ON "security"."user_on_rol"("rolId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_on_rol_rolId_userId_key" ON "security"."user_on_rol"("rolId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "company_name_key" ON "commun"."company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "person_email_key" ON "commun"."person"("email");

-- CreateIndex
CREATE UNIQUE INDEX "person_userId_key" ON "commun"."person"("userId");

-- AddForeignKey
ALTER TABLE "security"."access_on_rol" ADD CONSTRAINT "access_on_rol_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "security"."role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security"."access_on_rol" ADD CONSTRAINT "access_on_rol_accessId_fkey" FOREIGN KEY ("accessId") REFERENCES "security"."access"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security"."user_on_rol" ADD CONSTRAINT "user_on_rol_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "security"."role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security"."user_on_rol" ADD CONSTRAINT "user_on_rol_userId_fkey" FOREIGN KEY ("userId") REFERENCES "security"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commun"."person" ADD CONSTRAINT "person_userId_fkey" FOREIGN KEY ("userId") REFERENCES "security"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commun"."data_person" ADD CONSTRAINT "data_person_catalogue_id_fkey" FOREIGN KEY ("catalogue_id") REFERENCES "commun"."catalogue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commun"."data_person" ADD CONSTRAINT "data_person_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "commun"."person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "course_type" VARCHAR(45) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "matricula" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atribuition" (
    "id" SERIAL NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Atribuition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "roles" VARCHAR(100) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AtribuitionStudent" (
    "atribuitionId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "AtribuitionStudent_pkey" PRIMARY KEY ("atribuitionId","studentId")
);

-- CreateTable
CREATE TABLE "MealType" (
    "id" SERIAL NOT NULL,
    "meal_type" VARCHAR(45) NOT NULL,

    CONSTRAINT "MealType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealTypeStudent" (
    "mealTypeId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "MealTypeStudent_pkey" PRIMARY KEY ("mealTypeId","studentId")
);

-- CreateIndex
CREATE INDEX "AtribuitionStudent_studentId_idx" ON "AtribuitionStudent"("studentId");

-- CreateIndex
CREATE INDEX "AtribuitionStudent_atribuitionId_idx" ON "AtribuitionStudent"("atribuitionId");

-- CreateIndex
CREATE INDEX "AtribuitionStudent_eventId_idx" ON "AtribuitionStudent"("eventId");

-- CreateIndex
CREATE INDEX "AtribuitionStudent_roleId_idx" ON "AtribuitionStudent"("roleId");

-- CreateIndex
CREATE INDEX "MealTypeStudent_studentId_idx" ON "MealTypeStudent"("studentId");

-- CreateIndex
CREATE INDEX "MealTypeStudent_mealTypeId_idx" ON "MealTypeStudent"("mealTypeId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtribuitionStudent" ADD CONSTRAINT "AtribuitionStudent_atribuitionId_fkey" FOREIGN KEY ("atribuitionId") REFERENCES "Atribuition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtribuitionStudent" ADD CONSTRAINT "AtribuitionStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtribuitionStudent" ADD CONSTRAINT "AtribuitionStudent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtribuitionStudent" ADD CONSTRAINT "AtribuitionStudent_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealTypeStudent" ADD CONSTRAINT "MealTypeStudent_mealTypeId_fkey" FOREIGN KEY ("mealTypeId") REFERENCES "MealType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealTypeStudent" ADD CONSTRAINT "MealTypeStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

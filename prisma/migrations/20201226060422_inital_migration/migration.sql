-- CreateTable
CREATE TABLE "Faculty" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "School" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT true,
    "facultyId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Semester" (
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "finishDate" TIMESTAMP(3),
    "state" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "User" (
"id" SERIAL,
    "nickname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "photo" TEXT NOT NULL,
    "genre" BOOLEAN NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT true,
    "semesterId" TEXT NOT NULL,
    "schoolId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "academicPhase" INTEGER NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT true,
    "schoolId" INTEGER NOT NULL,

    PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Teacher" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
"id" SERIAL,
    "denomination" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT true,
    "courseCode" TEXT NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "semesterId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enrollment" (
"id" SERIAL,
    "weightedAverage" INTEGER,
    "state" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL,
    "semesterId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnrollmentDetail" (
"id" SERIAL,
    "averageGrade" DECIMAL(65,30),
    "state" BOOLEAN NOT NULL DEFAULT true,
    "enrollmentId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeActivity" (
"id" SERIAL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL,
    "presentationDate" TIMESTAMP(3),
    "state" BOOLEAN NOT NULL DEFAULT true,
    "typeActivityId" INTEGER NOT NULL,
    "activityId" INTEGER,
    "groupId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grade" (
"id" SERIAL,
    "calification" DECIMAL(65,30),
    "confirmated" BOOLEAN NOT NULL DEFAULT false,
    "state" BOOLEAN NOT NULL DEFAULT true,
    "activityId" INTEGER NOT NULL,
    "enrollmentDetailId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
"id" SERIAL,
    "day" INTEGER NOT NULL,
    "startHour" TIMESTAMP(3) NOT NULL,
    "finishHour" TIMESTAMP(3) NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT true,
    "groupId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CoursesPrerequisites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Faculty.name_unique" ON "Faculty"("name");

-- CreateIndex
CREATE UNIQUE INDEX "School.name_unique" ON "School"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User.nickname_unique" ON "User"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Group.denomination_courseCode_teacherId_semesterId_unique" ON "Group"("denomination", "courseCode", "teacherId", "semesterId");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment.userId_semesterId_unique" ON "Enrollment"("userId", "semesterId");

-- CreateIndex
CREATE UNIQUE INDEX "EnrollmentDetail.enrollmentId_groupId_unique" ON "EnrollmentDetail"("enrollmentId", "groupId");

-- CreateIndex
CREATE UNIQUE INDEX "Grade.activityId_enrollmentDetailId_unique" ON "Grade"("activityId", "enrollmentDetailId");

-- CreateIndex
CREATE UNIQUE INDEX "_CoursesPrerequisites_AB_unique" ON "_CoursesPrerequisites"("A", "B");

-- CreateIndex
CREATE INDEX "_CoursesPrerequisites_B_index" ON "_CoursesPrerequisites"("B");

-- AddForeignKey
ALTER TABLE "School" ADD FOREIGN KEY("facultyId")REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY("semesterId")REFERENCES "Semester"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY("schoolId")REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD FOREIGN KEY("schoolId")REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD FOREIGN KEY("courseCode")REFERENCES "Course"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD FOREIGN KEY("teacherId")REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD FOREIGN KEY("semesterId")REFERENCES "Semester"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD FOREIGN KEY("semesterId")REFERENCES "Semester"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnrollmentDetail" ADD FOREIGN KEY("enrollmentId")REFERENCES "Enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnrollmentDetail" ADD FOREIGN KEY("groupId")REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD FOREIGN KEY("typeActivityId")REFERENCES "TypeActivity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD FOREIGN KEY("activityId")REFERENCES "Activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD FOREIGN KEY("groupId")REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD FOREIGN KEY("activityId")REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD FOREIGN KEY("enrollmentDetailId")REFERENCES "EnrollmentDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD FOREIGN KEY("groupId")REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesPrerequisites" ADD FOREIGN KEY("A")REFERENCES "Course"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesPrerequisites" ADD FOREIGN KEY("B")REFERENCES "Course"("code") ON DELETE CASCADE ON UPDATE CASCADE;

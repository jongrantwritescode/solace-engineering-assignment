-- Migration to refactor the advocates table schema
-- 1. Rename payload column to specialties
-- 2. Change phone_number from bigint to text
-- 3. Add indexes for better search performance

-- First, drop existing indexes that might conflict
DROP INDEX IF EXISTS "name_idx";
DROP INDEX IF EXISTS "city_idx";
DROP INDEX IF EXISTS "degree_idx";
DROP INDEX IF EXISTS "experience_idx";
DROP INDEX IF EXISTS "specialties_idx";

-- Rename the payload column to specialties
ALTER TABLE "advocates" RENAME COLUMN "payload" TO "specialties";

-- Change phone_number column type from bigint to text
-- First, create a temporary column
ALTER TABLE "advocates" ADD COLUMN "phone_number_new" text;

-- Copy data from the old column to the new one
UPDATE "advocates" SET "phone_number_new" = "phone_number"::text;

-- Drop the old column and rename the new one
ALTER TABLE "advocates" DROP COLUMN "phone_number";
ALTER TABLE "advocates" RENAME COLUMN "phone_number_new" TO "phone_number";

-- Make the phone_number column NOT NULL
ALTER TABLE "advocates" ALTER COLUMN "phone_number" SET NOT NULL;

-- Add new indexes for better search performance
CREATE INDEX IF NOT EXISTS "name_idx" ON "advocates" USING btree ("first_name","last_name");
CREATE INDEX IF NOT EXISTS "city_idx" ON "advocates" USING btree ("city");
CREATE INDEX IF NOT EXISTS "degree_idx" ON "advocates" USING btree ("degree");
CREATE INDEX IF NOT EXISTS "experience_idx" ON "advocates" USING btree ("years_of_experience");
CREATE INDEX IF NOT EXISTS "specialties_idx" ON "advocates" USING btree ("specialties");

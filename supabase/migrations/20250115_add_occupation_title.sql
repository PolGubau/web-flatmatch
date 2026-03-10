-- Migration: Add occupation_title and update occupation constraint
-- Date: 2025-01-15
-- Description: Adds occupation_title field and updates occupation enum to include new types

-- 1. Add occupation_title column
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS occupation_title TEXT;

-- 2. Drop the old occupation constraint
ALTER TABLE users 
DROP CONSTRAINT IF EXISTS users_occupation_check;

-- 3. Add new occupation constraint with updated values
ALTER TABLE users 
ADD CONSTRAINT users_occupation_check 
CHECK (
  occupation = ANY (ARRAY[
    'student'::text, 
    'employed'::text, 
    'self-employed'::text,
    'freelancer'::text,
    'unemployed'::text, 
    'other'::text
  ])
);

-- 4. Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_users_occupation ON users(occupation);
CREATE INDEX IF NOT EXISTS idx_users_occupation_title ON users(occupation_title);

-- 5. Add comment for documentation
COMMENT ON COLUMN users.occupation_title IS 'Job title or field of study (e.g., "Software Engineer", "Computer Science")';


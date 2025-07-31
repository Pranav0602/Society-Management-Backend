-- Fix database schema for enum columns
-- Run this script in your MySQL database to fix the data truncation issues

-- Update users table
ALTER TABLE users MODIFY COLUMN role VARCHAR(20) NOT NULL;

-- Update flat_allocations table
ALTER TABLE flat_allocations MODIFY COLUMN status VARCHAR(20) NOT NULL;
ALTER TABLE flat_allocations MODIFY COLUMN resident_type VARCHAR(20) NOT NULL;

-- Update notices table
ALTER TABLE notices MODIFY COLUMN priority VARCHAR(20);

-- Update flats table
ALTER TABLE flats MODIFY COLUMN flat_type VARCHAR(20);

-- Update visitors table
ALTER TABLE visitors MODIFY COLUMN status VARCHAR(20);

-- Update complaints table
ALTER TABLE complaints MODIFY COLUMN category VARCHAR(20);
ALTER TABLE complaints MODIFY COLUMN status VARCHAR(20);

-- Update societies table (for the new fields we added)
ALTER TABLE societies ADD COLUMN IF NOT EXISTS city VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE societies ADD COLUMN IF NOT EXISTS state VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE societies ADD COLUMN IF NOT EXISTS pincode VARCHAR(6) NOT NULL DEFAULT '';
ALTER TABLE societies ADD COLUMN IF NOT EXISTS registration_number VARCHAR(50) NOT NULL DEFAULT '';

-- Make sure the registration_number is unique
ALTER TABLE societies ADD UNIQUE INDEX IF NOT EXISTS uk_societies_registration_number (registration_number);
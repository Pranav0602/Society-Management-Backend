-- Fix database schema for enum columns
-- Run this script in your MySQL database to fix the data truncation issues

-- Update users table
ALTER TABLE users MODIFY COLUMN role TINYINT NOT NULL;

-- Update flat_allocations table
ALTER TABLE flat_allocations MODIFY COLUMN status TINYINT NOT NULL;
ALTER TABLE flat_allocations MODIFY COLUMN resident_type TINYINT NOT NULL;

-- Update notices table
ALTER TABLE notices MODIFY COLUMN priority TINYINT;

-- Update flats table
ALTER TABLE flats MODIFY COLUMN flat_type TINYINT;

-- Update visitors table
ALTER TABLE visitors MODIFY COLUMN status TINYINT;

-- Update complaints table
ALTER TABLE complaints MODIFY COLUMN category TINYINT;
ALTER TABLE complaints MODIFY COLUMN status TINYINT;

-- Update societies table (for the new fields we added)
-- Check if columns exist before adding them
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = 'hsmsdb' AND TABLE_NAME = 'societies' AND COLUMN_NAME = 'city') = 0,
    'ALTER TABLE societies ADD COLUMN city VARCHAR(100) NOT NULL DEFAULT "";',
    'SELECT "Column city already exists" as message;'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = 'hsmsdb' AND TABLE_NAME = 'societies' AND COLUMN_NAME = 'state') = 0,
    'ALTER TABLE societies ADD COLUMN state VARCHAR(100) NOT NULL DEFAULT "";',
    'SELECT "Column state already exists" as message;'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = 'hsmsdb' AND TABLE_NAME = 'societies' AND COLUMN_NAME = 'pincode') = 0,
    'ALTER TABLE societies ADD COLUMN pincode VARCHAR(6) NOT NULL DEFAULT "";',
    'SELECT "Column pincode already exists" as message;'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = 'hsmsdb' AND TABLE_NAME = 'societies' AND COLUMN_NAME = 'registration_number') = 0,
    'ALTER TABLE societies ADD COLUMN registration_number VARCHAR(50) NOT NULL DEFAULT "";',
    'SELECT "Column registration_number already exists" as message;'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add unique constraint only if it doesn't exist
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS 
     WHERE TABLE_SCHEMA = 'hsmsdb' AND TABLE_NAME = 'societies' AND INDEX_NAME = 'uk_societies_registration_number') = 0,
    'ALTER TABLE societies ADD UNIQUE INDEX uk_societies_registration_number (registration_number);',
    'SELECT "Unique constraint already exists" as message;'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
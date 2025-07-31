# Database Schema Fix Instructions

## Problem
You're getting "Data truncated for column 'role' at row 1" error because the database columns for enum fields are too small to store the enum values.

## Solutions (Try in Order)

### Solution 1: Use the SQL Script (Recommended)
1. Connect to your MySQL database
2. Run the SQL script: `fix_database_schema.sql`
3. This will update all enum columns to have proper sizes

### Solution 2: Temporary DDL Auto Setting (Current Setup)
1. The application.properties is currently set to `spring.jpa.hibernate.ddl-auto=create-drop`
2. Start your application - this will drop and recreate all tables with correct column sizes
3. **WARNING**: This will delete all existing data
4. After the first startup, change back to `spring.jpa.hibernate.ddl-auto=update`

### Solution 3: Manual Database Commands
If you have MySQL access, run these commands:

```sql
-- Connect to your database first
USE hsmsdb;

-- Update enum columns
ALTER TABLE users MODIFY COLUMN role TINYINT NOT NULL;
ALTER TABLE flat_allocations MODIFY COLUMN status TINYINT NOT NULL;
ALTER TABLE flat_allocations MODIFY COLUMN resident_type TINYINT NOT NULL;
ALTER TABLE notices MODIFY COLUMN priority TINYINT;
ALTER TABLE flats MODIFY COLUMN flat_type TINYINT;
ALTER TABLE visitors MODIFY COLUMN status TINYINT;
ALTER TABLE complaints MODIFY COLUMN category TINYINT;
ALTER TABLE complaints MODIFY COLUMN status TINYINT;

-- Add missing society columns
ALTER TABLE societies ADD COLUMN IF NOT EXISTS city VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE societies ADD COLUMN IF NOT EXISTS state VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE societies ADD COLUMN IF NOT EXISTS pincode VARCHAR(6) NOT NULL DEFAULT '';
ALTER TABLE societies ADD COLUMN IF NOT EXISTS registration_number VARCHAR(50) NOT NULL DEFAULT '';
```

## Current Changes Made

### Entity Updates
- Changed all enum mappings from `EnumType.STRING` to `EnumType.ORDINAL`
- This uses integer values (0, 1, 2) instead of strings ("ADMIN", "RESIDENT", "GUARD")
- Much smaller column size requirement

### Enum Values Mapping
- UserRole: ADMIN=0, RESIDENT=1, GUARD=2
- AllocationStatus: PENDING=0, APPROVED=1, REJECTED=2
- ResidentType: OWNER=0, TENANT=1
- NoticePriority: LOW=0, NORMAL=1, HIGH=2
- FlatType: 1BHK=0, 2BHK=1, 3BHK=2, etc.
- VisitorStatus: PENDING=0, APPROVED=1, REJECTED=2
- ComplaintCategory: MAINTENANCE=0, SECURITY=1, etc.
- ComplaintStatus: PENDING=0, IN_PROGRESS=1, RESOLVED=2

## Testing
After applying any solution:
1. Restart your application
2. Test your Postman request again
3. The registration should work without data truncation errors

## Reverting to String Enums (Optional)
If you prefer string enums for readability:
1. Change back to `EnumType.STRING` in all entities
2. Add `@Column(length = 20)` to all enum fields
3. Run the SQL script to update column sizes to VARCHAR(20)
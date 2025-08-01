-- Housing Management System - Dummy Data Script
-- Run this script in MySQL Workbench to populate your database with test data

USE hsmsdb;

-- Clear existing data (optional - uncomment if you want to start fresh)
-- SET FOREIGN_KEY_CHECKS = 0;
-- TRUNCATE TABLE visitors;
-- TRUNCATE TABLE complaints;
-- TRUNCATE TABLE notices;
-- TRUNCATE TABLE maintenance_bills;
-- TRUNCATE TABLE flat_members;
-- TRUNCATE TABLE flat_allocations;
-- TRUNCATE TABLE flats;
-- TRUNCATE TABLE buildings;
-- TRUNCATE TABLE users;
-- TRUNCATE TABLE societies;
-- SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================
-- 1. SOCIETIES DATA
-- =====================================================
INSERT INTO societies (name, address, city, state, pincode, registration_number, number_of_buildings, created_at) VALUES
('Sunrise Apartments', '123 Main Street', 'Mumbai', 'Maharashtra', '400001', 'SUN0012024001', 3, NOW()),
('Green Valley Society', '456 Park Avenue', 'Delhi', 'Delhi', '110001', 'GRV0022024002', 2, NOW()),
('Royal Heights', '789 Hill Road', 'Bangalore', 'Karnataka', '560001', 'ROY0032024003', 4, NOW()),
('Lake View Residency', '321 Lake Drive', 'Chennai', 'Tamil Nadu', '600001', 'LAK0042024004', 2, NOW()),
('Ocean Paradise', '654 Beach Road', 'Kolkata', 'West Bengal', '700001', 'OCE0052024005', 3, NOW());

-- =====================================================
-- 2. USERS DATA (with hashed passwords)
-- =====================================================
-- Note: These passwords are BCrypt hashed versions of "password123"
-- You may need to generate proper hashes using your application
INSERT INTO users (name, email, phone, password, role, society_id, enabled, created_at) VALUES
-- Admin Users
('Admin John', 'admin@sunrise.com', '9876543210', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 0, 1, 1, NOW()),
('Admin Sarah', 'admin@greenvalley.com', '9876543211', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 0, 2, 1, NOW()),
('Admin Mike', 'admin@royal.com', '9876543212', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 0, 3, 1, NOW()),

-- Resident Users
('Resident Alice', 'alice@sunrise.com', '9876543220', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 1, 1, 1, NOW()),
('Resident Bob', 'bob@sunrise.com', '9876543221', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 1, 1, 1, NOW()),
('Resident Carol', 'carol@greenvalley.com', '9876543222', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 1, 2, 1, NOW()),
('Resident David', 'david@greenvalley.com', '9876543223', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 1, 2, 1, NOW()),
('Resident Emma', 'emma@royal.com', '9876543224', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 1, 3, 1, NOW()),
('Resident Frank', 'frank@royal.com', '9876543225', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 1, 3, 1, NOW()),

-- Guard Users
('Guard Tom', 'guard@sunrise.com', '9876543230', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 2, 1, 1, NOW()),
('Guard Jerry', 'guard@greenvalley.com', '9876543231', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 2, 2, 1, NOW()),
('Guard Harry', 'guard@royal.com', '9876543232', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 2, 3, 1, NOW());

-- =====================================================
-- 3. BUILDINGS DATA
-- =====================================================
INSERT INTO buildings (name, total_floors, society_id, created_at, updated_at) VALUES
-- Sunrise Apartments Buildings
('Building A', 10, 1, NOW(), NOW()),
('Building B', 8, 1, NOW(), NOW()),
('Building C', 12, 1, NOW(), NOW()),

-- Green Valley Society Buildings
('Tower 1', 15, 2, NOW(), NOW()),
('Tower 2', 15, 2, NOW(), NOW()),

-- Royal Heights Buildings
('Block A', 20, 3, NOW(), NOW()),
('Block B', 20, 3, NOW(), NOW()),
('Block C', 20, 3, NOW(), NOW()),
('Block D', 20, 3, NOW(), NOW());

-- =====================================================
-- 4. FLATS DATA
-- =====================================================
INSERT INTO flats (flat_number, floor_number, flat_type, area, building_id, created_at, updated_at) VALUES
-- Building A Flats
('A-101', 1, 0, 1200.0, 1, NOW(), NOW()), -- 1BHK
('A-102', 1, 1, 1500.0, 1, NOW(), NOW()), -- 2BHK
('A-201', 2, 1, 1500.0, 1, NOW(), NOW()), -- 2BHK
('A-202', 2, 2, 1800.0, 1, NOW(), NOW()), -- 3BHK
('A-301', 3, 2, 1800.0, 1, NOW(), NOW()), -- 3BHK

-- Building B Flats
('B-101', 1, 0, 1100.0, 2, NOW(), NOW()), -- 1BHK
('B-102', 1, 1, 1400.0, 2, NOW(), NOW()), -- 2BHK
('B-201', 2, 1, 1400.0, 2, NOW(), NOW()), -- 2BHK
('B-202', 2, 2, 1700.0, 2, NOW(), NOW()), -- 3BHK

-- Building C Flats
('C-101', 1, 0, 1300.0, 3, NOW(), NOW()), -- 1BHK
('C-102', 1, 1, 1600.0, 3, NOW(), NOW()), -- 2BHK
('C-201', 2, 1, 1600.0, 3, NOW(), NOW()), -- 2BHK
('C-202', 2, 2, 1900.0, 3, NOW(), NOW()), -- 3BHK

-- Tower 1 Flats
('T1-101', 1, 0, 1400.0, 4, NOW(), NOW()), -- 1BHK
('T1-102', 1, 1, 1700.0, 4, NOW(), NOW()), -- 2BHK
('T1-201', 2, 1, 1700.0, 4, NOW(), NOW()), -- 2BHK
('T1-202', 2, 2, 2000.0, 4, NOW(), NOW()), -- 3BHK

-- Tower 2 Flats
('T2-101', 1, 0, 1400.0, 5, NOW(), NOW()), -- 1BHK
('T2-102', 1, 1, 1700.0, 5, NOW(), NOW()), -- 2BHK
('T2-201', 2, 1, 1700.0, 5, NOW(), NOW()), -- 2BHK
('T2-202', 2, 2, 2000.0, 5, NOW(), NOW()), -- 3BHK

-- Block A Flats
('BA-101', 1, 0, 1500.0, 6, NOW(), NOW()), -- 1BHK
('BA-102', 1, 1, 1800.0, 6, NOW(), NOW()), -- 2BHK
('BA-201', 2, 1, 1800.0, 6, NOW(), NOW()), -- 2BHK
('BA-202', 2, 2, 2100.0, 6, NOW(), NOW()), -- 3BHK

-- Block B Flats
('BB-101', 1, 0, 1500.0, 7, NOW(), NOW()), -- 1BHK
('BB-102', 1, 1, 1800.0, 7, NOW(), NOW()), -- 2BHK
('BB-201', 2, 1, 1800.0, 7, NOW(), NOW()), -- 2BHK
('BB-202', 2, 2, 2100.0, 7, NOW(), NOW()), -- 3BHK

-- Block C Flats
('BC-101', 1, 0, 1500.0, 8, NOW(), NOW()), -- 1BHK
('BC-102', 1, 1, 1800.0, 8, NOW(), NOW()), -- 2BHK
('BC-201', 2, 1, 1800.0, 8, NOW(), NOW()), -- 2BHK
('BC-202', 2, 2, 2100.0, 8, NOW(), NOW()), -- 3BHK

-- Block D Flats
('BD-101', 1, 0, 1500.0, 9, NOW(), NOW()), -- 1BHK
('BD-102', 1, 1, 1800.0, 9, NOW(), NOW()), -- 2BHK
('BD-201', 2, 1, 1800.0, 9, NOW(), NOW()), -- 2BHK
('BD-202', 2, 2, 2100.0, 9, NOW(), NOW()); -- 3BHK

-- =====================================================
-- 5. FLAT ALLOCATIONS DATA
-- =====================================================
INSERT INTO flat_allocations (user_id, flat_id, resident_type, status, occupation, family_members) VALUES
-- Sunrise Apartments Allocations
(4, 1, 0, 1, 'Software Engineer', 3), -- Alice - Owner
(5, 2, 0, 1, 'Doctor', 4), -- Bob - Owner
(4, 3, 1, 1, 'Teacher', 2), -- Alice - Tenant
(5, 4, 0, 1, 'Business Owner', 5), -- Bob - Owner

-- Green Valley Society Allocations
(6, 13, 0, 1, 'Architect', 3), -- Carol - Owner
(7, 14, 0, 1, 'Lawyer', 4), -- David - Owner
(6, 15, 1, 1, 'Engineer', 2), -- Carol - Tenant
(7, 16, 0, 1, 'Consultant', 3), -- David - Owner

-- Royal Heights Allocations
(8, 25, 0, 1, 'Manager', 4), -- Emma - Owner
(9, 26, 0, 1, 'Designer', 3), -- Frank - Owner
(8, 27, 1, 1, 'Analyst', 2), -- Emma - Tenant
(9, 28, 0, 1, 'Developer', 4); -- Frank - Owner

-- =====================================================
-- 6. NOTICES DATA
-- =====================================================
INSERT INTO notices (title, content, priority, created_by, society_id, is_active, created_at, expires_at) VALUES
-- Sunrise Apartments Notices
('Water Supply Maintenance', 'Water supply will be interrupted on 15th March for maintenance work. Please store water accordingly.', 2, 1, 1, 1, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY)),
('Society Meeting', 'Monthly society meeting will be held on 20th March at 6 PM in the community hall.', 1, 1, 1, 1, NOW(), DATE_ADD(NOW(), INTERVAL 15 DAY)),
('Security Alert', 'Please ensure all gates are properly closed and report any suspicious activity to security.', 2, 1, 1, 1, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY)),

-- Green Valley Society Notices
('Garden Maintenance', 'Garden maintenance work will be carried out on 18th March. Please avoid parking near the garden area.', 1, 2, 2, 1, NOW(), DATE_ADD(NOW(), INTERVAL 20 DAY)),
('Electricity Bill Due', 'Electricity bill payment is due by 25th March. Please pay on time to avoid late fees.', 2, 2, 2, 1, NOW(), DATE_ADD(NOW(), INTERVAL 10 DAY)),
('New Security Guard', 'We welcome Mr. Jerry as our new security guard. Please cooperate with him.', 1, 2, 2, 1, NOW(), DATE_ADD(NOW(), INTERVAL 60 DAY)),

-- Royal Heights Notices
('Lift Maintenance', 'Lift maintenance will be carried out on 22nd March. Please use stairs during this time.', 2, 3, 3, 1, NOW(), DATE_ADD(NOW(), INTERVAL 25 DAY)),
('Society Rules Update', 'Updated society rules are available at the reception. Please read and follow them.', 1, 3, 3, 1, NOW(), DATE_ADD(NOW(), INTERVAL 45 DAY)),
('Fire Safety Drill', 'Fire safety drill will be conducted on 28th March. All residents must participate.', 2, 3, 3, 1, NOW(), DATE_ADD(NOW(), INTERVAL 35 DAY));

-- =====================================================
-- 7. COMPLAINTS DATA
-- =====================================================
INSERT INTO complaints (title, description, category, status, flat_id, user_id, created_at) VALUES
-- Sunrise Apartments Complaints
('Water Leakage', 'There is water leakage from the ceiling in the bathroom.', 0, 0, 1, 4, NOW()),
('Power Outage', 'No electricity in the living room since yesterday.', 1, 1, 2, 5, NOW()),
('Garbage Collection', 'Garbage is not being collected regularly from our floor.', 2, 0, 3, 4, NOW()),
('Parking Issue', 'Someone has parked in my assigned parking spot.', 3, 2, 4, 5, NOW()),

-- Green Valley Society Complaints
('AC Not Working', 'Air conditioner is not cooling properly.', 0, 1, 13, 6, NOW()),
('Internet Problem', 'Internet connection is very slow in the evening.', 1, 0, 14, 7, NOW()),
('Noise Complaint', 'Loud music is being played late at night from flat 15.', 2, 0, 15, 6, NOW()),
('Lift Not Working', 'Lift is stuck and not working properly.', 0, 1, 16, 7, NOW()),

-- Royal Heights Complaints
('Plumbing Issue', 'Water is not flowing properly in the kitchen sink.', 0, 0, 25, 8, NOW()),
('Security Concern', 'Unknown person was seen loitering in the parking area.', 3, 1, 26, 9, NOW()),
('Gym Equipment', 'Treadmill in the gym is not working.', 2, 0, 27, 8, NOW()),
('Swimming Pool', 'Swimming pool water is not clean.', 2, 1, 28, 9, NOW());

-- =====================================================
-- 8. VISITORS DATA
-- =====================================================
INSERT INTO visitors (name, phone, purpose, entry_time, exit_time, flat_id, logged_by, status, approved, created_at) VALUES
-- Sunrise Apartments Visitors
('John Smith', '1111111111', 'Meeting with resident', NOW(), DATE_ADD(NOW(), INTERVAL 2 HOUR), 1, 10, 1, 1, NOW()),
('Mary Johnson', '2222222222', 'Delivery', NOW(), DATE_ADD(NOW(), INTERVAL 30 MINUTE), 2, 10, 1, 1, NOW()),
('Robert Brown', '3333333333', 'Family visit', NOW(), NULL, 3, 10, 0, 0, NOW()),
('Lisa Davis', '4444444444', 'Service provider', NOW(), DATE_ADD(NOW(), INTERVAL 1 HOUR), 4, 10, 1, 1, NOW()),

-- Green Valley Society Visitors
('Michael Wilson', '5555555555', 'Business meeting', NOW(), DATE_ADD(NOW(), INTERVAL 3 HOUR), 13, 11, 1, 1, NOW()),
('Sarah Taylor', '6666666666', 'Friend visit', NOW(), NULL, 14, 11, 0, 0, NOW()),
('David Anderson', '7777777777', 'Maintenance work', NOW(), DATE_ADD(NOW(), INTERVAL 4 HOUR), 15, 11, 1, 1, NOW()),
('Emily Thomas', '8888888888', 'Delivery service', NOW(), DATE_ADD(NOW(), INTERVAL 45 MINUTE), 16, 11, 1, 1, NOW()),

-- Royal Heights Visitors
('James Jackson', '9999999999', 'Family gathering', NOW(), DATE_ADD(NOW(), INTERVAL 5 HOUR), 25, 12, 1, 1, NOW()),
('Patricia White', '1010101010', 'Medical consultation', NOW(), NULL, 26, 12, 0, 0, NOW()),
('Christopher Harris', '2020202020', 'Technical support', NOW(), DATE_ADD(NOW(), INTERVAL 2 HOUR), 27, 12, 1, 1, NOW()),
('Amanda Martin', '3030303030', 'Cleaning service', NOW(), DATE_ADD(NOW(), INTERVAL 3 HOUR), 28, 12, 1, 1, NOW());

-- =====================================================
-- 9. MAINTENANCE BILLS DATA
-- =====================================================
INSERT INTO maintenance_bills (bill_number, flat_id, amount, bill_date, due_date, paid, payment_date, description, created_at) VALUES
-- Sunrise Apartments Bills
('MB001-2024-01', 1, 2500.00, '2024-01-01', '2024-01-15', 1, '2024-01-10', 'Monthly maintenance for January 2024', NOW()),
('MB002-2024-01', 2, 2800.00, '2024-01-01', '2024-01-15', 1, '2024-01-12', 'Monthly maintenance for January 2024', NOW()),
('MB003-2024-01', 3, 2600.00, '2024-01-01', '2024-01-15', 0, NULL, 'Monthly maintenance for January 2024', NOW()),
('MB004-2024-01', 4, 3000.00, '2024-01-01', '2024-01-15', 1, '2024-01-08', 'Monthly maintenance for January 2024', NOW()),

-- Green Valley Society Bills
('MB005-2024-01', 13, 3200.00, '2024-01-01', '2024-01-15', 1, '2024-01-11', 'Monthly maintenance for January 2024', NOW()),
('MB006-2024-01', 14, 3500.00, '2024-01-01', '2024-01-15', 1, '2024-01-09', 'Monthly maintenance for January 2024', NOW()),
('MB007-2024-01', 15, 3300.00, '2024-01-01', '2024-01-15', 0, NULL, 'Monthly maintenance for January 2024', NOW()),
('MB008-2024-01', 16, 3800.00, '2024-01-01', '2024-01-15', 1, '2024-01-13', 'Monthly maintenance for January 2024', NOW()),

-- Royal Heights Bills
('MB009-2024-01', 25, 4000.00, '2024-01-01', '2024-01-15', 1, '2024-01-07', 'Monthly maintenance for January 2024', NOW()),
('MB010-2024-01', 26, 4200.00, '2024-01-01', '2024-01-15', 1, '2024-01-14', 'Monthly maintenance for January 2024', NOW()),
('MB011-2024-01', 27, 4100.00, '2024-01-01', '2024-01-15', 0, NULL, 'Monthly maintenance for January 2024', NOW()),
('MB012-2024-01', 28, 4500.00, '2024-01-01', '2024-01-15', 1, '2024-01-06', 'Monthly maintenance for January 2024', NOW());

-- =====================================================
-- 10. FLAT MEMBERS DATA
-- =====================================================
INSERT INTO flat_members (name, email, phone, relationship, is_owner, approved, flat_id, user_id, created_at) VALUES
-- Sunrise Apartments Members
('Alice Johnson', 'alice@email.com', '9876543220', 'Wife', 1, 1, 1, 4, NOW()),
('Tom Johnson', 'tom@email.com', '9876543221', 'Son', 0, 1, 1, 4, NOW()),
('Bob Wilson', 'bob@email.com', '9876543222', 'Husband', 1, 1, 2, 5, NOW()),
('Mary Wilson', 'mary@email.com', '9876543223', 'Wife', 0, 1, 2, 5, NOW()),

-- Green Valley Society Members
('Carol Davis', 'carol@email.com', '9876543224', 'Wife', 1, 1, 13, 6, NOW()),
('David Brown', 'david@email.com', '9876543225', 'Husband', 1, 1, 14, 7, NOW()),
('Emma Brown', 'emma@email.com', '9876543226', 'Daughter', 0, 1, 14, 7, NOW()),

-- Royal Heights Members
('Frank Miller', 'frank@email.com', '9876543227', 'Husband', 1, 1, 25, 8, NOW()),
('Grace Miller', 'grace@email.com', '9876543228', 'Wife', 0, 1, 25, 8, NOW()),
('Henry Garcia', 'henry@email.com', '9876543229', 'Husband', 1, 1, 26, 9, NOW()),
('Iris Garcia', 'iris@email.com', '9876543230', 'Wife', 0, 1, 26, 9, NOW());

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check data counts
SELECT 'Societies' as table_name, COUNT(*) as count FROM societies
UNION ALL
SELECT 'Users', COUNT(*) FROM users
UNION ALL
SELECT 'Buildings', COUNT(*) FROM buildings
UNION ALL
SELECT 'Flats', COUNT(*) FROM flats
UNION ALL
SELECT 'Flat Allocations', COUNT(*) FROM flat_allocations
UNION ALL
SELECT 'Notices', COUNT(*) FROM notices
UNION ALL
SELECT 'Complaints', COUNT(*) FROM complaints
UNION ALL
SELECT 'Visitors', COUNT(*) FROM visitors
UNION ALL
SELECT 'Maintenance Bills', COUNT(*) FROM maintenance_bills
UNION ALL
SELECT 'Flat Members', COUNT(*) FROM flat_members;

-- Check society details
SELECT 
    s.name as society_name,
    s.city,
    s.state,
    COUNT(DISTINCT b.id) as building_count,
    COUNT(DISTINCT f.id) as flat_count,
    COUNT(DISTINCT u.id) as user_count
FROM societies s
LEFT JOIN buildings b ON s.id = b.society_id
LEFT JOIN flats f ON b.id = f.building_id
LEFT JOIN users u ON s.id = u.society_id
GROUP BY s.id, s.name, s.city, s.state;

-- Check user roles distribution
SELECT 
    CASE 
        WHEN role = 0 THEN 'ADMIN'
        WHEN role = 1 THEN 'RESIDENT'
        WHEN role = 2 THEN 'GUARD'
    END as role_name,
    COUNT(*) as count
FROM users
GROUP BY role;

-- Check complaint status distribution
SELECT 
    CASE 
        WHEN status = 0 THEN 'PENDING'
        WHEN status = 1 THEN 'IN_PROGRESS'
        WHEN status = 2 THEN 'RESOLVED'
    END as status_name,
    COUNT(*) as count
FROM complaints
GROUP BY status;

-- Check visitor status distribution
SELECT 
    CASE 
        WHEN status = 0 THEN 'PENDING'
        WHEN status = 1 THEN 'APPROVED'
        WHEN status = 2 THEN 'REJECTED'
    END as status_name,
    COUNT(*) as count
FROM visitors
GROUP BY status;
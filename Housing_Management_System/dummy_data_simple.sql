-- Housing Management System - Simple Dummy Data Script
-- Run this script in MySQL Workbench to populate your database with test data
-- Note: This script doesn't include password hashing - you'll need to register users through your application

USE hsmsdb;

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
-- 2. BUILDINGS DATA
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
-- 3. FLATS DATA
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
-- 4. NOTICES DATA (without created_by since we don't have users yet)
-- =====================================================
INSERT INTO notices (title, content, priority, society_id, is_active, created_at, expires_at) VALUES
-- Sunrise Apartments Notices
('Water Supply Maintenance', 'Water supply will be interrupted on 15th March for maintenance work. Please store water accordingly.', 2, 1, 1, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY)),
('Society Meeting', 'Monthly society meeting will be held on 20th March at 6 PM in the community hall.', 1, 1, 1, NOW(), DATE_ADD(NOW(), INTERVAL 15 DAY)),
('Security Alert', 'Please ensure all gates are properly closed and report any suspicious activity to security.', 2, 1, 1, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY)),

-- Green Valley Society Notices
('Garden Maintenance', 'Garden maintenance work will be carried out on 18th March. Please avoid parking near the garden area.', 1, 2, 1, NOW(), DATE_ADD(NOW(), INTERVAL 20 DAY)),
('Electricity Bill Due', 'Electricity bill payment is due by 25th March. Please pay on time to avoid late fees.', 2, 2, 1, NOW(), DATE_ADD(NOW(), INTERVAL 10 DAY)),
('New Security Guard', 'We welcome Mr. Jerry as our new security guard. Please cooperate with him.', 1, 2, 1, NOW(), DATE_ADD(NOW(), INTERVAL 60 DAY)),

-- Royal Heights Notices
('Lift Maintenance', 'Lift maintenance will be carried out on 22nd March. Please use stairs during this time.', 2, 3, 1, NOW(), DATE_ADD(NOW(), INTERVAL 25 DAY)),
('Society Rules Update', 'Updated society rules are available at the reception. Please read and follow them.', 1, 3, 1, NOW(), DATE_ADD(NOW(), INTERVAL 45 DAY)),
('Fire Safety Drill', 'Fire safety drill will be conducted on 28th March. All residents must participate.', 2, 3, 1, NOW(), DATE_ADD(NOW(), INTERVAL 35 DAY));

-- =====================================================
-- 5. MAINTENANCE BILLS DATA
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
-- VERIFICATION QUERIES
-- =====================================================

-- Check data counts
SELECT 'Societies' as table_name, COUNT(*) as count FROM societies
UNION ALL
SELECT 'Buildings', COUNT(*) FROM buildings
UNION ALL
SELECT 'Flats', COUNT(*) FROM flats
UNION ALL
SELECT 'Notices', COUNT(*) FROM notices
UNION ALL
SELECT 'Maintenance Bills', COUNT(*) FROM maintenance_bills;

-- Check society details
SELECT 
    s.name as society_name,
    s.city,
    s.state,
    COUNT(DISTINCT b.id) as building_count,
    COUNT(DISTINCT f.id) as flat_count
FROM societies s
LEFT JOIN buildings b ON s.id = b.society_id
LEFT JOIN flats f ON b.id = f.building_id
GROUP BY s.id, s.name, s.city, s.state;

-- Check flat types distribution
SELECT 
    CASE 
        WHEN flat_type = 0 THEN '1BHK'
        WHEN flat_type = 1 THEN '2BHK'
        WHEN flat_type = 2 THEN '3BHK'
    END as flat_type_name,
    COUNT(*) as count
FROM flats
GROUP BY flat_type;
-- Simple database fix script
-- Run this in your MySQL database

USE hsmsdb;

-- Drop existing tables to recreate them properly
DROP TABLE IF EXISTS flat_allocations;
DROP TABLE IF EXISTS complaints;
DROP TABLE IF EXISTS visitors;
DROP TABLE IF EXISTS notices;
DROP TABLE IF EXISTS maintenance_bills;
DROP TABLE IF EXISTS flat_members;
DROP TABLE IF EXISTS flats;
DROP TABLE IF EXISTS buildings;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS societies;

-- Now restart your Spring Boot application
-- It will recreate all tables with correct column sizes
-- Tạo database cho MySQL
CREATE DATABASE IF NOT EXISTS HeartCareDB;
USE HeartCareDB;

-- Tạo bảng users
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50),
    phone VARCHAR(20),
    created_at DATETIME
);

-- Tạo bảng patients
CREATE TABLE IF NOT EXISTS patients (
    patient_id INT AUTO_INCREMENT PRIMARY KEY,
    citizen_id VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    date_of_birth DATE,
    gender VARCHAR(10),
    medical_history TEXT,
    created_by INT,
    created_at DATETIME
);

-- Tạo bảng predictions
CREATE TABLE IF NOT EXISTS predictions (
    prediction_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    age INT,
    sex INT,
    cp INT,
    trestbps FLOAT,
    chol FLOAT,
    fbs INT,
    restecg INT,
    thalach FLOAT,
    exang INT,
    oldpeak FLOAT,
    slope INT,
    ca INT,
    thal INT,
    prediction INT,
    prediction_date DATETIME
);
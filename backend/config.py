import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Base configuration"""
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-this')
    
    # Database
    DB_SERVER = os.getenv('DB_SERVER', 'localhost')
    DB_PORT = int(os.getenv('DB_PORT', 3306))
    DB_DATABASE = os.getenv('DB_DATABASE', 'HeartCareDB')
    DB_USER = os.getenv('DB_USER', 'root')
    DB_PASSWORD = os.getenv('DB_PASSWORD', '')
    DB_DRIVER = os.getenv('DB_DRIVER', 'ODBC Driver 17 for SQL Server')
    
    # JWT
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key-change-this')
    JWT_ALGORITHM = os.getenv('JWT_ALGORITHM', 'HS256')
    JWT_EXPIRATION_HOURS = int(os.getenv('JWT_EXPIRATION_HOURS', 24))
    
    # CORS
    # Allow both default Vite ports (5173 and 5174) and any overrides via .env
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', 'http://localhost:5173,http://localhost:5174').split(',')

    # Development helper: when true, authentication checks are bypassed
    # Use only for local development/testing. Set DISABLE_AUTH=true in .env to enable.
    DISABLE_AUTH = os.getenv('DISABLE_AUTH', 'false').lower() == 'true'
    
    # API
    API_PORT = int(os.getenv('API_PORT', 5000))
    API_HOST = os.getenv('API_HOST', '0.0.0.0')
    
    JSON_SORT_KEYS = False
    JSONIFY_PRETTYPRINT_REGULAR = True

class DevelopmentConfig(Config):
    """Development configuration"""
    FLASK_ENV = 'development'
    DEBUG = True

class ProductionConfig(Config):
    """Production configuration"""
    FLASK_ENV = 'production'
    DEBUG = False

class TestingConfig(Config):
    """Testing configuration"""
    TESTING = True
    DATABASE_URL = 'sqlite:///:memory:'

def get_config():
    """Get configuration based on environment"""
    env = os.getenv('FLASK_ENV', 'development')
    if env == 'production':
        return ProductionConfig()
    elif env == 'testing':
        return TestingConfig()
    return DevelopmentConfig()

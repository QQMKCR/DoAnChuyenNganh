from app.database import Database
from werkzeug.security import generate_password_hash, check_password_hash

class User:
    """User model"""
    
    @staticmethod
    def create(email, password, full_name, role='doctor', phone=None):
        """Create new user"""
        password_hash = generate_password_hash(password)
        
        try:
            Database.add_user(email, password_hash, full_name, role, phone)
            return True
        except Exception as e:
            print(f"Error creating user: {e}")
            return False
    
    @staticmethod
    def get_by_email(email):
        """Get user by email"""
        return Database.get_user_by_email(email)
    
    @staticmethod
    def get_by_id(user_id):
        """Get user by ID"""
        user = Database.get_user_by_id(user_id)
        if user:
            # Remove password hash from response
            user_copy = user.copy()
            user_copy.pop('password_hash', None)
            return user_copy
        return None
    
    @staticmethod
    def verify_password(password, password_hash):
        """Verify password"""
        return check_password_hash(password_hash, password)
    
    @staticmethod
    def get_all():
        """Get all users"""
        users = Database.get_all_users()
        # Remove password hashes
        for user in users:
            user.pop('password_hash', None)
        return users

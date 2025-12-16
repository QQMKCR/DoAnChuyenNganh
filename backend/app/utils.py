import jwt
import datetime
from functools import wraps
from flask import request, jsonify
from config import Config

class AuthUtil:
    """Authentication utilities"""
    
    @staticmethod
    def generate_token(user_id, user_email, role):
        """Generate JWT token"""
        payload = {
            'user_id': user_id,
            'email': user_email,
            'role': role,
            'iat': datetime.datetime.utcnow(),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=Config.JWT_EXPIRATION_HOURS)
        }
        token = jwt.encode(
            payload,
            Config.JWT_SECRET_KEY,
            algorithm=Config.JWT_ALGORITHM
        )
        return token
    
    @staticmethod
    def verify_token(token):
        """Verify JWT token"""
        try:
            payload = jwt.decode(
                token,
                Config.JWT_SECRET_KEY,
                algorithms=[Config.JWT_ALGORITHM]
            )
            return payload
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
    
    @staticmethod
    def get_token_from_request():
        """Extract token from request header"""
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None
        
        try:
            token = auth_header.split(' ')[1]
            return token
        except IndexError:
            return None

def require_auth(f):
    """Decorator to require authentication"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # If auth is disabled in config, populate a dev user and continue.
        try:
            if getattr(Config, 'DISABLE_AUTH', False):
                dev_header = request.headers.get('X-Dev-User')
                if dev_header:
                    import json
                    try:
                        payload = json.loads(dev_header)
                    except Exception:
                        payload = {'user_id': 1, 'email': 'dev@local', 'role': 'admin'}
                else:
                    payload = {'user_id': 1, 'email': 'dev@local', 'role': 'admin'}

                request.user = payload
                return f(*args, **kwargs)
        except Exception:
            # If reading config fails, fall back to normal verification below
            pass

        token = AuthUtil.get_token_from_request()
        if not token:
            return jsonify({'error': 'Missing token'}), 401

        payload = AuthUtil.verify_token(token)
        if not payload:
            return jsonify({'error': 'Invalid or expired token'}), 401

        # Add user info to request context
        request.user = payload
        return f(*args, **kwargs)
    
    return decorated_function

def require_admin(f):
    """Decorator to require admin role"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # If auth disabled, allow admin access by providing a dev admin user
        try:
            if getattr(Config, 'DISABLE_AUTH', False):
                request.user = {'user_id': 1, 'email': 'dev@local', 'role': 'admin'}
                return f(*args, **kwargs)
        except Exception:
            pass

        token = AuthUtil.get_token_from_request()
        if not token:
            return jsonify({'error': 'Missing token'}), 401

        payload = AuthUtil.verify_token(token)
        if not payload:
            return jsonify({'error': 'Invalid or expired token'}), 401

        if payload.get('role') != 'admin':
            return jsonify({'error': 'Admin access required'}), 403

        request.user = payload
        return f(*args, **kwargs)
    
    return decorated_function

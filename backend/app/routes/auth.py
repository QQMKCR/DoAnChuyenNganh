from flask import Blueprint, request, jsonify
from app.models.user import User
from app.utils import AuthUtil

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    """Register new user"""
    try:
        data = request.get_json()
        
        # Validation
        if not data.get('email') or not data.get('password') or not data.get('full_name'):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Check if user exists
        existing_user = User.get_by_email(data['email'])
        if existing_user:
            return jsonify({'error': 'User already exists'}), 409
        
        # Create user
        success = User.create(
            email=data['email'],
            password=data['password'],
            full_name=data['full_name'],
            role=data.get('role', 'doctor'),
            phone=data.get('phone')
        )
        
        if success:
            return jsonify({'message': 'User created successfully'}), 201
        else:
            return jsonify({'error': 'Failed to create user'}), 500
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    """Login user"""
    try:
        data = request.get_json()
        
        if not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Missing email or password'}), 400
        
        # Get user
        user = User.get_by_email(data['email'])
        if not user:
            return jsonify({'error': 'Invalid email or password'}), 401
        
        # Verify password
        if not User.verify_password(data['password'], user['password_hash']):
            return jsonify({'error': 'Invalid email or password'}), 401
        
        # Generate token
        token = AuthUtil.generate_token(user['user_id'], user['email'], user['role'])
        
        return jsonify({
            'token': token,
            'user': {
                'user_id': user['user_id'],
                'email': user['email'],
                'full_name': user['full_name'],
                'role': user['role']
            }
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/verify', methods=['GET'])
def verify():
    """Verify token"""
    try:
        token = AuthUtil.get_token_from_request()
        if not token:
            return jsonify({'error': 'Missing token'}), 401
        
        payload = AuthUtil.verify_token(token)
        if not payload:
            return jsonify({'error': 'Invalid or expired token'}), 401
        
        user = User.get_by_id(payload['user_id'])
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'valid': True,
            'user': user
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

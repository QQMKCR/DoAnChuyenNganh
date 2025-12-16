from flask import Blueprint, jsonify

health_bp = Blueprint('health', __name__, url_prefix='/api')

@health_bp.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'API is running'}), 200

@health_bp.route('/', methods=['GET'])
def root():
    """Root endpoint"""
    return jsonify({
        'name': 'Heart Care API',
        'version': '1.0.0',
        'status': 'running'
    }), 200

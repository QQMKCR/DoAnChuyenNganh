from flask import Flask
from flask_cors import CORS
from config import get_config
from app.routes.health import health_bp
from app.routes.auth import auth_bp
from app.routes.patient import patient_bp
from app.routes.heart_risk import heart_risk_bp

def create_app():
    """Create and configure Flask app"""
    app = Flask(__name__)
    
    # Load config
    config = get_config()
    app.config.from_object(config)
    
    # Enable CORS
    CORS(app, resources={
        r"/api/*": {
            "origins": config.CORS_ORIGINS,
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })
    
    # Register blueprints
    app.register_blueprint(health_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(patient_bp)
    app.register_blueprint(heart_risk_bp)
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return {'error': 'Not found'}, 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return {'error': 'Internal server error'}, 500
    
    return app

from app import create_app
from config import get_config

if __name__ == '__main__':
    config = get_config()
    app = create_app()
    
    print(f"Starting API server on {config.API_HOST}:{config.API_PORT}")
    print(f"Environment: {config.FLASK_ENV}")
    
    app.run(
        host=config.API_HOST,
        port=config.API_PORT,
        debug=config.DEBUG
    )

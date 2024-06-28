from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS

db = SQLAlchemy()
jwt = JWTManager()


def create_app(test_config=None):
    app = Flask(__name__)
    CORS(app, supports_credentials=True)
    if test_config:
        app.config.from_object('app.config.Config')
    else:
        app.config.from_object('app.config.Config')

    db.init_app(app)
    jwt.init_app(app)

    from .routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api')

    from .routes.orders import orders_bp
    app.register_blueprint(orders_bp, url_prefix='/api/orders')

    from .utils.helpers import routes_bp
    app.register_blueprint(routes_bp, url_prefix='/routes')

    with app.app_context():
        db.create_all()

    return app


__all__ = [
    'db',
    'jwt',
    'create_app'
]

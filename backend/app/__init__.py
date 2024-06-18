from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
jwt = JWTManager()


def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    db.init_app(app)
    jwt.init_app(app)

    from .routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')

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

from os import environ, path, getenv


def reading_user_file():
    user_file_path = getenv('POSTGRES_USER_FILE')
    if not user_file_path or not path.exists(user_file_path):
        raise FileNotFoundError(f"Не найден файл c логином. Путь: {user_file_path}")
    with open(user_file_path, 'r') as f:
        return f.read().strip()


def reading_password_file():
    password_file_path = getenv('POSTGRES_PASSWORD_FILE')
    if not password_file_path or not path.exists(password_file_path):
        raise FileNotFoundError(f"Не найден файл с паролем. Путь: {password_file_path}")
    with open(password_file_path, 'r') as f:
        return f.read().strip()


class Config(object):
    SQLALCHEMY_TRACK_MODIFICATIONS = environ['SQLALCHEMY_TRACK_MODIFICATIONS']
    DEBUG = environ['DEBUG']

    DB_USER = reading_user_file()
    DB_PASS = reading_password_file()
    DB = environ['POSTGRES_DB']
    DB_PORT = environ['POSTGRES_PORT']
    SQLALCHEMY_DATABASE_URI = f'postgresql://{DB_USER}:{DB_PASS}@{DB}:{DB_PORT}/postgres'

    SECRET_KEY = 'your_secret_key'
    JWT_SECRET_KEY = 'your_jwt_secret_key'

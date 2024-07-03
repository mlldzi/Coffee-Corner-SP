from app import create_app, db
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), 'app')))
app = create_app()


def reset_db():
    with app.app_context():
        db.drop_all()
        db.create_all()
        print("reseted")


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == 'reset_db':
        reset_db()
    else:
        app.run(host='0.0.0.0', port=2500)

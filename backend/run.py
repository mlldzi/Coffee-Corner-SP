from app import create_app  # from __init__
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), 'app')))
app = create_app()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=2500)

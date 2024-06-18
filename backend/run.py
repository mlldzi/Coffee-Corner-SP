from app import create_app  # function from __init__

app = create_app()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=2500)

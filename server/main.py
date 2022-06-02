from app import app
from database.init_db import init_db


def main():
    init_db()
    app.run(host="localhost", port=8000, debug=True)


if __name__ == '__main__':
    main()
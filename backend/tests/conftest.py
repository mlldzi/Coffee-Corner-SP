import unittest
from app import create_app, db


def parse_set_cookie(headers):
    cookies = {}
    for header in headers:
        if header[0] == 'Set-Cookie':
            parts = header[1].split(';')
            cookie = parts[0].split('=')
            cookies[cookie[0]] = cookie[1]
    return cookies


class BaseTestCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app('test')
        self.client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        pass
        # я не могу подключить другую бд, поэтому тесты идут в основную
        # db.session.remove()
        # db.drop_all()
        # self.app_context.pop()

    def login(self, phone_number, password):
        data = {'phone_number': phone_number, 'password': password}
        response = self.client.post('/api/login', json=data)

        cookies = parse_set_cookie(response.headers)

        access_token = cookies.get('access_token_cookie')
        refresh_token = cookies.get('refresh_token_cookie')
        csrf_access_token = cookies.get('csrf_access_token')
        csrf_refresh_token = cookies.get('csrf_refresh_token')

        return {
            'access_token': access_token,
            'refresh_token': refresh_token,
            'csrf_access_token': csrf_access_token,
            'csrf_refresh_token': csrf_refresh_token
        }

    def delete_profile(self):
        tokens = self.login("+1230", "test_password")
        headers = {
            'Authorization': 'Bearer ' + tokens["access_token"],
            'x-csrf-token': tokens["csrf_access_token"],
            'Cookie': f"csrf_access_token={tokens['csrf_access_token']}"
        }
        self.client.delete('api/profile', headers=headers)

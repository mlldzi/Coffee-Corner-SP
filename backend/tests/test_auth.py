import unittest
from tests.conftest import BaseTestCase


class AuthTestCase(BaseTestCase):
    def test_register(self, test_flag=True):
        data = {
            'full_name': 'Test User',
            'phone_number': '+1230',
            'password': 'test_password'
        }
        response = self.client.post('api/register', json=data)

        if response.status_code == 409:  # да, это странно, но я не могу почему-то подключить отдельную бд,
            # поэтому работаю в основой
            self.delete_profile()
            self.test_register()
        else:
            self.assertEqual(response.status_code, 201)
            self.assertIn('success', response.json)
            if test_flag:
                self.delete_profile()

    def test_login(self):
        self.test_register(False)
        data = {
            'phone_number': '+1230',
            'password': 'test_password'
        }
        response = self.client.post('api/login', json=data)
        self.assertEqual(response.status_code, 200)
        self.assertIn('access_token', response.json)
        self.delete_profile()

    def test_profile(self):
        self.test_register(False)
        tokens = self.login("+1230", "test_password")
        headers = {
            'Authorization': 'Bearer ' + tokens["access_token"],
            'x-csrf-token': tokens["csrf_access_token"],
            'Cookie': f"csrf_access_token={tokens['csrf_access_token']}; "
                      f"csrf_refresh_token={tokens['csrf_refresh_token']}"
        }
        response = self.client.get('api/profile', headers=headers)
        self.assertEqual(response.status_code, 200)
        self.delete_profile()

    def test_delete_profile(self):
        self.test_register(False)
        tokens = self.login("+1230", "test_password")
        headers = {
            'Authorization': 'Bearer ' + tokens["access_token"],
            'x-csrf-token': tokens["csrf_access_token"],
            'Cookie': f"csrf_access_token={tokens['csrf_access_token']}"
        }
        response = self.client.delete('api/profile', headers=headers)
        self.assertEqual(response.status_code, 200)
        self.assertIn('success', response.json)
        response = self.client.get('/profile', headers=headers)
        self.assertEqual(response.status_code, 404)


if __name__ == '__main__':
    unittest.main()

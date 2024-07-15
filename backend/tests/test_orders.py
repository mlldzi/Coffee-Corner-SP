import unittest
from tests.conftest import BaseTestCase


class OrdersTestCase(BaseTestCase):
    def delete_order(self):
        self.client.delete('/api/orders/delete_order/latest')

    def test_create_order(self, test_flag=True):
        data = {
            'phone_number': '+1234567890',
            'cart': ["американо", "латте"],
            'prepared_by': '2024-06-27T12:00',
            'total_amount': 100
        }
        response = self.client.post('api/orders/create_order', json=data)
        self.assertEqual(response.status_code, 201)
        self.assertIn('success', response.json)
        if test_flag:
            self.delete_order()

    def test_get_order(self):
        self.test_create_order(False)
        response = self.client.get('/api/orders/get_order/latest')
        self.assertEqual(response.status_code, 200)
        self.assertIn('order', response.json)
        self.delete_order()

    def test_get_orders(self):
        self.test_create_order(False)
        response = self.client.get('/api/orders/get_orders')
        self.assertEqual(response.status_code, 200)
        self.assertIn('orders', response.json)
        self.delete_order()

    def test_get_orders_by_phone(self):
        self.test_create_order(False)
        response = self.client.get('/api/orders/get_orders_by_phone/+1230')
        self.assertEqual(response.status_code, 200)
        self.assertIn('orders', response.json)
        self.delete_order()

    def test_get_incomplete_orders(self):
        self.test_create_order(False)
        response = self.client.get('/api/orders/get_incomplete_orders')
        self.assertEqual(response.status_code, 200)
        self.assertIn('orders', response.json)
        self.delete_order()

    def test_update_order(self):
        self.test_create_order(False)
        data = {
            'phone_number': '+1234567890',
            'cart': ["американо", "латте"],
            'prepared_by': '2024-06-27T12:00',
            'total_amount': 100
        }
        response = self.client.put('/api/orders/update_order/latest', json=data)
        self.assertEqual(response.status_code, 200)
        self.assertIn('success', response.json)
        self.delete_order()

    def test_delete_order(self):
        self.test_create_order(False)
        response = self.client.delete('/api/orders/delete_order/latest')
        self.assertEqual(response.status_code, 200)
        self.assertIn('success', response.json)


if __name__ == '__main__':
    unittest.main()

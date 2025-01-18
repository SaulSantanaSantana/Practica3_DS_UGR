import unittest
from calculadora import app 
import json

class FlaskTestCase(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    # Test para verificar si un número es primo
    def test_is_prime(self):
        response = self.app.get('/is_prime?number=5')
        data = json.loads(response.data)
        self.assertEqual(data['is_prime'], True)
        self.assertEqual(response.status_code, 200)

    # Test para la raíz cuadrada
    def test_square_root(self):
        response = self.app.get('/square_root?number=9')
        data = json.loads(response.data)
        self.assertEqual(data['square_root'], 3)
        self.assertEqual(response.status_code, 200)

    # Test para suma
    def test_add(self):
        response = self.app.get('/add?num1=2&num2=3')
        data = json.loads(response.data)
        self.assertEqual(data['sum'], 5)
        self.assertEqual(response.status_code, 200)

    # Test para resta
    def test_subtract(self):
        response = self.app.get('/subtract?num1=5&num2=3')
        data = json.loads(response.data)
        self.assertEqual(data['difference'], 2)
        self.assertEqual(response.status_code, 200)

    # Test para multiplicación
    def test_multiply(self):
        response = self.app.get('/multiply?num1=2&num2=3')
        data = json.loads(response.data)
        self.assertEqual(data['product'], 6)
        self.assertEqual(response.status_code, 200)

    # Test para división
    def test_divide(self):
        response = self.app.get('/divide?num1=6&num2=3')
        data = json.loads(response.data)
        self.assertEqual(data['quotient'], 2)
        self.assertEqual(response.status_code, 200)

    # Test para división entre cero
    def test_divide_by_zero(self):
        response = self.app.get('/divide?num1=6&num2=0')
        data = json.loads(response.data)
        self.assertIn('error', data)
        self.assertEqual(response.status_code, 400)

    # Test para división entera
    def test_integer_divide(self):
        response = self.app.get('/integer_divide?num1=5&num2=2')
        data = json.loads(response.data)
        self.assertEqual(data['integer_quotient'], 2)
        self.assertEqual(response.status_code, 200)

    # Test para división entera entre cero
    def test_integer_divide_by_zero(self):
        response = self.app.get('/integer_divide?num1=5&num2=0')
        data = json.loads(response.data)
        self.assertIn('error', data)
        self.assertEqual(response.status_code, 400)

if __name__ == '__main__':
    unittest.main()

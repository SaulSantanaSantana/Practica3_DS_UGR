from flask import Flask, request, jsonify
from flask_cors import CORS
import math
import os

CORS(app)

app = Flask(__name__)

# Función para verificar si un número es primo
def is_prime(n):
    if n <= 1:
        return False
    for i in range(2, int(math.sqrt(n)) + 1):
        if n % i == 0:
            return False
    return True

# Endpoint para verificar si un número es primo
@app.route('/is_prime', methods=['GET'])
def check_prime():
    number = int(request.args.get('number', '0'))
    result = is_prime(number)
    return jsonify({"number": number, "is_prime": result})

# Endpoint para calcular la raíz cuadrada
@app.route('/square_root', methods=['GET'])
def square_root():
    number = float(request.args.get('number', '0'))
    if number < 0:
        return jsonify({"error": "Cannot compute the square root of a negative number."}), 400
    result = math.sqrt(number)
    return jsonify({"number": number, "square_root": result})

# Endpoint para suma
@app.route('/add', methods=['GET'])
def add():
    num1 = float(request.args.get('num1', '0'))
    num2 = float(request.args.get('num2', '0'))
    result = num1 + num2
    return jsonify({"num1": num1, "num2": num2, "sum": result})

# Endpoint para resta
@app.route('/subtract', methods=['GET'])
def subtract():
    num1 = float(request.args.get('num1', '0'))
    num2 = float(request.args.get('num2', '0'))
    result = num1 - num2
    return jsonify({"num1": num1, "num2": num2, "difference": result})

# Endpoint para multiplicación
@app.route('/multiply', methods=['GET'])
def multiply():
    num1 = float(request.args.get('num1', '0'))
    num2 = float(request.args.get('num2', '0'))
    result = num1 * num2
    return jsonify({"num1": num1, "num2": num2, "product": result})

# Endpoint para división
@app.route('/divide', methods=['GET'])
def divide():
    num1 = float(request.args.get('num1', '0'))
    num2 = float(request.args.get('num2', '0'))
    if num2 == 0:
        return jsonify({"error": "Cannot divide by zero."}), 400
    result = num1 / num2
    return jsonify({"num1": num1, "num2": num2, "quotient": result})

# Endpoint para división entera
@app.route('/integer_divide', methods=['GET'])
def integer_divide():
    num1 = int(request.args.get('num1', '0'))
    num2 = int(request.args.get('num2', '0'))
    if num2 == 0:
        return jsonify({"error": "Cannot divide by zero."}), 400
    result = num1 // num2
    return jsonify({"num1": num1, "num2": num2, "integer_quotient": result})

if __name__ == '__main__':
    debug_mode = os.getenv('FLASK_DEBUG', 'false').lower() == 'true'
    app.run(debug=debug_mode)


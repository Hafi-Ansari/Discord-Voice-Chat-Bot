from flask import Flask, request, jsonify 
from flask import request


app = Flask(__name__)

@app.route('/message', methods=['POST'])
def log_message():
    content = request.json
    user_message = content['message']
    print(f"Received message: {user_message}")  # Logging the user's message

    response = {
        "status": "success",
        "message": f"Received and logged \"{user_message}\""
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(port=5000)

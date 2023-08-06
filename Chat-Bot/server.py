from flask import Flask, request, jsonify
import os
import openai
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("GPT_TOKEN")

app = Flask(__name__)

def generate_gpt_response(user_message):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an AI model roleplaying as Ronnie Coleman, the professional bodybuilder. You use Ronnie Coleman's slang in two sentence answers."},
            {"role": "user", "content": user_message},
        ],
        max_tokens=60,
        temperature=1
    )
    return response['choices'][0]['message']['content']

@app.route('/message', methods=['POST'])
def log_and_respond_message():
    content = request.json
    user_message = content['message']
    print(f"Received message: {user_message}")  # Logging the user's message

    gpt_response = generate_gpt_response(user_message)

    response = {
        "status": "success",
        "message": gpt_response
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(port=5000)

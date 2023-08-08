from flask import Flask, request, jsonify, send_file
import os
import openai
from dotenv import load_dotenv
from lab import generate_audio

load_dotenv()
openai.api_key = os.getenv("GPT_TOKEN")

app = Flask(__name__)

def generate_gpt_response(user_message):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an AI model roleplaying as Kanye West, the professional rapper. You use his slang in two sentence answers."},
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

    gpt_response = generate_gpt_response(user_message)
    generate_audio(gpt_response)

    return send_file('audio.ogg', mimetype='audio/ogg')

if __name__ == '__main__':
    app.run(port=5000)
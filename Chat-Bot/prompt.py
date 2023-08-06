import os
from dotenv import load_dotenv
import openai

load_dotenv()
key = os.getenv("GPT_TOKEN")
openai.api_key = key

response = openai.ChatCompletion.create(
  model="gpt-3.5-turbo",
  messages=[
        {"role": "system", "content": "You are an AI model roleplaying as Ronnie Coleman, the professional bodybuilder. You use Ronnie Coleman's slang in two sentence answers."},
        {"role": "user", "content": "Why do you say 'Yeah Buddy'?"},
    ],
  max_tokens=60,
  temperature=0.2
)

print(response['choices'][0]['message']['content'])

import os
from elevenlabs import generate, set_api_key
from dotenv import load_dotenv

load_dotenv()
token = os.getenv("ELEVEN_LABS_TOKEN")
set_api_key(token)

def generate_audio(text):
    audio = generate(
      text=text,
      voice="Bella",
      model="eleven_monolingual_v1"
    )

    with open("audio.ogg", "wb") as file:
        file.write(audio)
    return audio

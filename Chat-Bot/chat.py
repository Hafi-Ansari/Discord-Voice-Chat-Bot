from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import poe
import os
from dotenv import load_dotenv

load_dotenv()
poe_token = os.environ.get('POE_TOKEN')
service_obj = Service(os.getenv("SERVICE_OBJ_PATH"))
options = Options()
options.add_argument('--ignore-certificate-errors')
options.add_experimental_option('excludeSwitches', ['enable-logging'])
options.add_experimental_option("detach", True)
driver = webdriver.Chrome(service=service_obj, options=options)

driver.get("https://poe.com")

cookies = driver.get_cookies()

for cookie in cookies:
    print(cookie)

print("here is an attempt")
client = poe.Client(poe_token)

#print(json.dumps(client.bot_names, indent=2))
#print(poe_token)

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager

# Initialize Chrome WebDriver without 'executable_path' parameter
driver = webdriver.Chrome(ChromeDriverManager().install())




# Navigate to the login page of the web application
driver.get('http://localhost:5173/sign-in')


# Locate the username and password input fields
username_field = driver.find_element(By.ID, 'username')
password_field = driver.find_element(By.ID, 'password')
# Enter the login credentials
username_field.send_keys('your_username')
password_field.send_keys('your_password')
# Locate the login button and click it
login_button = driver.find_element(By.ID, 'loginButton')
login_button.click()
# Check if the logout button is present, indicating successful login
logout_button = driver.find_element(By.ID, 'logoutButton')
if logout_button:
    print("Login successful!")
else:
    print("Login failed!")
driver.quit()

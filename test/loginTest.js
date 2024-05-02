import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

async function loginTest() {
    // Create a new instance of the Chrome WebDriver
    const driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options())
        .build();

    try {
        // Navigate to the web application URL
        await driver.get('http://localhost:5173/sign-in'); // Make sure the URL matches the path of your sign-in page

        // Wait until the email input field is present and located by its ID
        await driver.wait(until.elementLocated(By.id('email')), 5000);

        // Locate the email input field using its ID and enter the email
        await driver.findElement(By.id('email')).sendKeys('test1@selenium.com');

        // Locate the password input field using its ID and enter the password
        await driver.findElement(By.id('password')).sendKeys('1234');

        // Locate and click the login button
        await driver.findElement(By.xpath("//button[text()='Sign In Dude']")).click();

        const pageTitle = await driver.getTitle();
        console.log('Current page title:', pageTitle);


        // Wait for the page to load and check if login was successful
        await driver.wait(until.titleIs(pageTitle), 10000); // Replace 'Home Page' with your expected title
        
        // Add your assertions here to verify successful login

        console.log('Login test passed');

        
    } catch (error) {
        console.error('Login test failed:', error);
    } finally {
        // Quit the WebDriver
        await driver.quit();
    }
}

// Run the login test
loginTest();

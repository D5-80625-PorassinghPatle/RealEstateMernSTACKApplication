import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import assert from 'assert';

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
        await driver.findElement(By.id('password')).sendKeys('1264');

        // Locate and click the login button
        await driver.findElement(By.xpath("//button[text()='Sign In Dude']")).click();

        // Define a unique element that should be present on the home page after successful login
        // Example: Let's assume the home page contains an element with ID 'welcome-message' after login
        const welcomeMessageId = 'welcome-message';

        // Wait for the element to be located on the home page
        const element = await driver.wait(until.elementLocated(By.id(welcomeMessageId)), 10000);

        // Verify the element is displayed on the home page
        const isDisplayed = await element.isDisplayed();
        assert(isDisplayed, `Expected element with ID "${welcomeMessageId}" to be displayed, but it wasn't.`);

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

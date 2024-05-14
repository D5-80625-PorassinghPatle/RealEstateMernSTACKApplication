import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
async function loginTestFine() {
    const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options())
    .build();

    try {
        // Go to the login page
        await driver.get("https://practicetestautomation.com/practice-test-login/");

        // Wait until the username field is located
        await driver.wait(until.elementLocated(By.id("username")), 10000);

        // Fill in the login form
        await driver.findElement(By.id("username")).sendKeys("student");
        await driver.findElement(By.id("password")).sendKeys("Password123");

        // Click the submit button
        await driver.findElement(By.id("submit")).click();

        // Wait for the URL to change and the page to load
        await driver.wait(until.urlContains("logged-in-successfully"), 10000);

        // Get the current page URL
        const currentUrl = await driver.getCurrentUrl();

        // Verify the URL contains the expected string
        if (currentUrl.includes("logged-in-successfully")) {
            console.log('Login test passed: URL contains expected path.');
        } else {
            console.error('Login test failed: URL does not contain expected path.');
        }
        
    } catch (error) {
        console.error("Unsuccessful login test: " + error);
    } finally {
        // Quit the driver
        await driver.quit();
    }
}

loginTestFine();

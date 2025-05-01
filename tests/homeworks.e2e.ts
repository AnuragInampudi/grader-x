// tests/homeworks.e2e.ts
import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';

// Give Jest up to 30s for Chrome to spin up and your app to respond
jest.setTimeout(30_000);

let driver: WebDriver | null = null;
const BASE_URL = 'http://localhost:3000';
const TIMEOUT = 5_000;

beforeAll(async () => {
  const options = new chrome.Options()
    .addArguments('--headless', '--disable-gpu', '--no-sandbox');
  driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
  await driver.get(BASE_URL);
});

afterAll(async () => {
  if (driver) {
    await driver.quit();
  }
});

describe('Homework Grader X – E2E (Selenium)', () => {
  test('default tab shows the Create Assignment wizard', async () => {
    // Wait for the wizard’s main heading
    const wizardHeading = await driver!.wait(
      until.elementLocated(By.xpath("//h2[contains(., 'Create Assignment Rubric')]")),
      TIMEOUT
    );
    expect(await wizardHeading.getText()).toBe('Create Assignment Rubric');
  });

  test('clicking Grade Submissions loads the Grade Studio', async () => {
    const gradeBtn = await driver!.findElement(
      By.xpath("//button[contains(., 'Grade Submissions')]")
    );
    await gradeBtn.click();

    const gradeHeading = await driver!.wait(
      until.elementLocated(By.xpath("//h1[contains(., 'Grade Studio')]")),
      TIMEOUT
    );
    expect(await gradeHeading.getText()).toBe('Grade Studio');
  });

  test('clicking Analytics loads the Analytics Dashboard', async () => {
    const analyticsBtn = await driver!.findElement(
      By.xpath("//button[contains(., 'Analytics')]")
    );
    await analyticsBtn.click();

    const analyticsHeading = await driver!.wait(
      until.elementLocated(By.xpath("//h2[contains(., 'Analytics Dashboard')]")),
      TIMEOUT
    );
    expect(await analyticsHeading.getText()).toBe('Analytics Dashboard');
  });
});


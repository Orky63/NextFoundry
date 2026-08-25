const synthetics = require('@aws/synthetics-puppeteer');
const log = require('@aws/synthetics-logger');

const homepageUrl = 'https://nextfoundry.co.uk/';
const expectedText = 'Next Foundry';

exports.handler = async () => {
  const page = await synthetics.getPage();

  await synthetics.executeStep('load-homepage', async () => {
    const response = await page.goto(homepageUrl, {
      waitUntil: 'networkidle2',
      timeout: 45000,
    });

    if (!response) {
      throw new Error('Homepage did not return a response.');
    }

    const status = response.status();
    if (status < 200 || status >= 300) {
      throw new Error(`Homepage returned HTTP ${status}.`);
    }

    const bodyText = await page.evaluate(() => document.body.innerText);
    if (!bodyText.includes(expectedText)) {
      throw new Error(`Homepage did not contain expected text: ${expectedText}`);
    }

    log.info(`Homepage check passed with HTTP ${status}.`);
  });
};

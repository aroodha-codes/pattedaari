const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  await page.goto('https://pattedaari.netlify.app/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'launch_01_intro.png' });
  await page.locator('#clues').scrollIntoViewIfNeeded();
  await page.locator('#next-clue').click();
  await page.screenshot({ path: 'launch_02_clue.png' });
  await page.locator('#notebook').scrollIntoViewIfNeeded();
  await page.locator('#person-tabs button').nth(1).click();
  await page.locator('#timeline button[data-mark]').first().click();
  await page.screenshot({ path: 'launch_03_notebook.png' });
  await page.locator('#archive').click();
  await page.locator('dialog[open] button[data-day="2026-10-06"]').click();
  await page.locator('#conclusion').scrollIntoViewIfNeeded();
  await page.selectOption('#killer', '0');
  await page.selectOption('#weapon', '0');
  await page.selectOption('#time', '18:30');
  await page.screenshot({ path: 'launch_04_deduce.png' });
  await page.locator('#accuse-form').evaluate(form => form.requestSubmit());
  await page.locator('#feedback').scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'launch_05_solved.png' });
  await browser.close();
})();

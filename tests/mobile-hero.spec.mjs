import { test, expect } from '@playwright/test';

const widths = [320, 360, 375, 390, 412, 430, 480, 600, 768];

for (const width of widths) {
  test(`mobile hero flow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('http://127.0.0.1:3000/#top', { waitUntil: 'networkidle' });
    await page.locator('[data-mobile-hero="true"]').waitFor({ state: 'visible' });
    await page.waitForTimeout(1000);

    const result = await page.evaluate(() => {
      const rect = (selector) => document.querySelector(selector)?.getBoundingClientRect();
      const heroCopy = rect('[data-mobile-region="hero-copy"]');
      const founderStack = document.querySelector('[data-mobile-region="founders"]');
      const founder1 = founderStack?.querySelector(':scope > div:nth-child(1)')?.getBoundingClientRect();
      const founder2 = founderStack?.querySelector(':scope > div:nth-child(2)')?.getBoundingClientRect();
      const serviceGrid = rect('[data-mobile-region="service-grid"]');
      const marquee = document.querySelector('.marquee')?.getBoundingClientRect();
      const servicesSection = document.querySelector('#services')?.getBoundingClientRect();
      const viewport = window.innerWidth;
      const offenders = [...document.querySelectorAll('body *')].flatMap((element) => {
        const r = element.getBoundingClientRect();
        return r.right > viewport + 0.5 || r.left < -0.5 ? [element.tagName.toLowerCase() + (element.className ? `.${String(element.className).split(/\s+/)[0]}` : '')] : [];
      }).slice(0, 20);
      return {
        scrollWidth: document.documentElement.scrollWidth,
        viewport,
        heroCopy,
        founder1,
        founder2,
        serviceGrid,
        marquee,
        servicesSection,
        founderCount: document.querySelectorAll('.mobile-founder-card').length,
        serviceCount: document.querySelectorAll('.mobile-service-card').length,
        desktopHeroCount: document.querySelectorAll('.hero-reference-shell').length,
        offenders,
      };
    });

    expect(result.desktopHeroCount).toBe(0);
    expect(result.founderCount).toBe(2);
    expect(result.serviceCount).toBe(4);
    expect(result.scrollWidth).toBeLessThanOrEqual(result.viewport);
    expect(result.heroCopy.bottom).toBeLessThan(result.founder1.top);
    expect(result.founder1.bottom).toBeLessThan(result.founder2.top);
    expect(result.founder2.bottom).toBeLessThan(result.serviceGrid.top);
    expect(result.serviceGrid.bottom).toBeLessThan(result.marquee.top);
    expect(result.marquee.bottom).toBeLessThanOrEqual(result.servicesSection.top);
    expect(result.offenders).toEqual([]);
  });
}

test('desktop keeps desktop hero and does not render mobile hero', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('http://127.0.0.1:3000/#top', { waitUntil: 'networkidle' });
  await page.locator('.hero-reference-shell').waitFor({ state: 'visible' });
  await expect(page.locator('[data-mobile-hero="true"]')).toHaveCount(0);
});

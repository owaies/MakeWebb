import fs from 'node:fs';
import { test, expect } from '@playwright/test';

const widths = [320, 360, 375, 390, 412, 430, 480, 600, 768];
const root = process.cwd();

const sourceChecks = [
  ['app/hero-reference-optimized.tsx', 'hero-reference-shell'],
  ['app/mobile-hero.tsx', 'mobile-founder-card'],
  ['app/mobile-hero.css', '.mobile-founder-card'],
];

test('mobile rebuild source contract', () => {
  for (const [file, token] of sourceChecks) {
    const source = fs.readFileSync(`${root}/${file}`, 'utf8');
    expect(source).toContain(token);
  }
  const mobileCss = fs.readFileSync(`${root}/app/mobile-hero.css`, 'utf8');
  expect(mobileCss).not.toMatch(/\.mobile-founder-card[^{}]*\{[^}]*position\s*:\s*(absolute|fixed)/s);
  expect(mobileCss).not.toMatch(/\.mobile-hero-clean[^{}]*\{[^}]*height\s*:\s*[^;]+/s);
  expect(mobileCss).not.toMatch(/\.mobile-hero-clean[^{}]*\{[^}]*min-height\s*:\s*100vh/s);
  for (const obsolete of ['hero-mobile-final.css', 'hero-mobile-flow-fix.css', 'hero-mobile-structural.css', 'hero-mobile-art-directed.css']) {
    expect(fs.existsSync(`${root}/app/${obsolete}`)).toBe(false);
  }
  const layout = fs.readFileSync(`${root}/app/layout.tsx`, 'utf8');
  for (const obsoleteImport of ['hero-mobile-final.css', 'hero-mobile-flow-fix.css', 'hero-mobile-structural.css', 'hero-mobile-art-directed.css']) {
    expect(layout).not.toContain(obsoleteImport);
  }
  const r3f = fs.readFileSync(`${root}/app/hero-r3f-scene.tsx`, 'utf8');
  expect(r3f).toContain('mode === \'mobile\'');
  expect(r3f).toContain('{mobile ? <><Rings subtle /><Particles quality={quality} mobile /></>');
});

for (const width of widths) {
  test(`mobile hero flow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('http://127.0.0.1:3000/#top', { waitUntil: 'domcontentloaded' });

    const initial = await page.evaluate(() => ({
      desktopHeroCount: document.querySelectorAll('.hero-reference-shell').length,
      mobileHeroCount: document.querySelectorAll('[data-mobile-hero="true"]').length,
    }));
    expect(initial.desktopHeroCount).toBe(0);
    expect(initial.mobileHeroCount).toBe(0);

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
        if (element.closest('.marquee') || element.classList.contains('anime-cursor')) return [];
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

    console.log(`MOBILE_GEOMETRY ${width}px`, JSON.stringify({
      heroCopy: result.heroCopy,
      founder1: result.founder1,
      founder2: result.founder2,
      serviceGrid: result.serviceGrid,
      marquee: result.marquee,
      servicesSection: result.servicesSection,
      scrollWidth: result.scrollWidth,
      viewport: result.viewport,
    }));

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

    await page.waitForTimeout(2000);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'auto' }));
    await page.waitForTimeout(300);
    const afterScroll = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, viewport: window.innerWidth }));
    expect(afterScroll.scrollWidth).toBeLessThanOrEqual(afterScroll.viewport);
  });
}

test('desktop keeps desktop hero and does not render mobile hero', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('http://127.0.0.1:3000/#top', { waitUntil: 'networkidle' });
  await page.locator('.hero-reference-shell').waitFor({ state: 'visible' });
  await expect(page.locator('[data-mobile-hero="true"]')).toHaveCount(0);
});

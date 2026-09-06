import fs from 'node:fs';
import { test, expect } from '@playwright/test';

const widths = [320, 360, 375, 390, 412, 430, 480, 600, 768];
const root = process.cwd();

test('mobile rebuild source contract', () => {
  const hero = fs.readFileSync(`${root}/app/hero-reference-optimized.tsx`, 'utf8');
  expect(hero).toContain("import MobileHeroArtDirected from './mobile-hero-art-directed'");
  expect(hero).toContain('return mobile ? <MobileHeroArtDirected/> : <DesktopHero/>;');

  const mobile = fs.readFileSync(`${root}/app/mobile-hero-art-directed.tsx`, 'utf8');
  expect(mobile).toContain('className="mobile-art-hero"');
  expect(mobile).toContain('className="mobile-art-founders"');
  expect(mobile).toContain('className="mobile-art-services"');
  expect(mobile).not.toMatch(/position\s*:\s*(absolute|fixed)/);
  expect(mobile).not.toMatch(/height\s*:\s*100vh/);

  const mobileCss = fs.readFileSync(`${root}/app/mobile-hero-art-directed.css`, 'utf8');
  expect(mobileCss).toContain('.mobile-art-founders{display:flex;flex-direction:column');
  expect(mobileCss).toContain('.mobile-art-service-card');
  expect(mobileCss).not.toMatch(/\.mobile-art-founder[^{}]*\{[^}]*position\s*:\s*(absolute|fixed)/s);
  expect(mobileCss).not.toMatch(/\.mobile-art-hero[^{}]*\{[^}]*height\s*:\s*100vh/s);
  expect(mobileCss).not.toMatch(/\.mobile-art-hero[^{}]*\{[^}]*min-height\s*:\s*100vh/s);

  for (const obsolete of ['mobile-hero.tsx', 'mobile-hero.css']) {
    expect(fs.existsSync(`${root}/app/${obsolete}`)).toBe(false);
  }
  const layout = fs.readFileSync(`${root}/app/layout.tsx`, 'utf8');
  expect(layout).toContain("'./mobile-hero-art-directed.css'");
  expect(layout).not.toContain("'./mobile-hero.css'");

  const r3f = fs.readFileSync(`${root}/app/hero-r3f-scene.tsx`, 'utf8');
  expect(r3f).toContain("mode === 'mobile'");
  expect(r3f).toContain('{mobile ? <><Rings subtle /><Particles quality={quality} mobile /></>');
});

for (const width of widths) {
  test(`mobile hero flow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('http://127.0.0.1:3000/#top', { waitUntil: 'domcontentloaded' });

    await page.locator('[data-mobile-hero="true"]').waitFor({ state: 'visible' }).catch(async () => {
      await page.locator('.mobile-art-hero').waitFor({ state: 'visible' });
    });
    await page.waitForTimeout(1000);

    const result = await page.evaluate(() => {
      const rect = (selector) => document.querySelector(selector)?.getBoundingClientRect();
      const hero = rect('.mobile-art-hero');
      const heroCopy = rect('.mobile-art-intro');
      const founderStack = document.querySelector('.mobile-art-founders');
      const founder1 = founderStack?.querySelector(':scope > div:nth-child(1)')?.getBoundingClientRect();
      const founder2 = founderStack?.querySelector(':scope > div:nth-child(2)')?.getBoundingClientRect();
      const serviceGrid = rect('.mobile-art-services');
      const marquee = document.querySelector('.marquee')?.getBoundingClientRect();
      const servicesSection = document.querySelector('#services')?.getBoundingClientRect();
      const viewport = window.innerWidth;
      const offenders = [...document.querySelectorAll('body *')].flatMap((element) => {
        if (element.closest('.marquee') || element.classList.contains('anime-cursor')) return [];
        const r = element.getBoundingClientRect();
        return r.right > viewport + 0.5 || r.left < -0.5 ? [element.tagName.toLowerCase() + (element.className ? `.${String(element.className).split(/\s+/)[0]}` : '')] : [];
      }).slice(0, 20);
      return {
        hero,
        heroCopy,
        founder1,
        founder2,
        serviceGrid,
        marquee,
        servicesSection,
        founderCount: document.querySelectorAll('.mobile-art-founder').length,
        serviceCount: document.querySelectorAll('.mobile-art-service-card').length,
        mobileHeroCount: document.querySelectorAll('.mobile-art-hero').length,
        desktopHeroCount: document.querySelectorAll('.hero-reference-shell').length,
        offenders,
        scrollWidth: document.documentElement.scrollWidth,
        viewport,
      };
    });

    console.log(`MOBILE_GEOMETRY ${width}px`, JSON.stringify(result));

    expect(result.desktopHeroCount).toBe(0);
    expect(result.mobileHeroCount).toBe(1);
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
  await expect(page.locator('.mobile-art-hero')).toHaveCount(0);
});

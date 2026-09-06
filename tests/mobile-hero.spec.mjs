import fs from 'node:fs';
import { test, expect } from '@playwright/test';

const widths = [320, 360, 375, 390, 412, 430, 480, 600, 768, 820, 900, 1024];
const visualWidths = [390, 412, 768, 1280, 1440];
const root = process.cwd();
const url = 'http://127.0.0.1:3000/#top';

function assertMobileSourceContract() {
  const hero = fs.readFileSync(`${root}/app/hero-reference-optimized.tsx`, 'utf8');
  expect(hero).toContain("import MobileHeroArtDirected from './mobile-hero-art-directed'");
  expect(hero).toContain("type Presentation = 'mobile' | 'compact' | 'desktop'");
  expect(hero).toContain('navigator.maxTouchPoints');
  expect(hero).toContain("window.matchMedia('(pointer: coarse)')");
  expect(hero).toContain("window.matchMedia('(hover: none)')");
  expect(hero).toContain('document.documentElement.dataset.presentation=next');
  expect(hero).toContain("return presentation === 'desktop' ? <DesktopHero/> : <MobileHeroArtDirected/>");

  const mobile = fs.readFileSync(`${root}/app/mobile-hero-art-directed.tsx`, 'utf8');
  expect(mobile).toContain('className="mobile-art-hero"');
  expect(mobile).toContain('className="mobile-art-founders"');
  expect(mobile).toContain('className="mobile-art-services"');
  expect(mobile).toContain('<HeroThreeScene mode="mobile"/>');
  expect(mobile).toContain('animate(root.querySelectorAll<HTMLElement>(\'.mobile-art-founder-sheen\')');
  expect(mobile).toMatch(/<MobileFounderCard[^>]+person=\{person\}/);
  expect(mobile.match(/function MobileFounderCard\(/g)?.length ?? 0).toBe(1);
  expect(mobile.match(/function MobileServiceVisual\(/g)?.length ?? 0).toBe(1);

  const compactCss = fs.readFileSync(`${root}/app/presentation-responsive.css`, 'utf8');
  expect(compactCss).toContain('[data-presentation="compact"] .mobile-art-hero');
  expect(compactCss).toContain('[data-presentation="compact"] .mobile-art-founder');
  expect(compactCss).toContain('[data-presentation="compact"] .mobile-art-services');
  expect(compactCss).toContain('[data-presentation="mobile"] .nav-links');
  expect(compactCss).toContain('[data-presentation="compact"] .nav-links');

  const artCss = fs.readFileSync(`${root}/app/mobile-art-direction-v2.css`, 'utf8');
  expect(artCss).toContain('.mobile-art-mw-stage');
  expect(artCss).toContain('.mobile-art-founder');
  expect(artCss).toContain('.mobile-art-service-card');
  expect(artCss).toContain('@media (min-width:600px) and (max-width:1024px)');

  for (const obsolete of ['mobile-hero.tsx', 'mobile-hero.css']) expect(fs.existsSync(`${root}/app/${obsolete}`)).toBe(false);
  const layout = fs.readFileSync(`${root}/app/layout.tsx`, 'utf8');
  expect(layout).toContain("'./mobile-art-direction-v2.css'");
  expect(layout).not.toContain("'./mobile-hero.css'");

  const r3f = fs.readFileSync(`${root}/app/hero-r3f-scene.tsx`, 'utf8');
  expect(r3f).toContain('function GlassCube({mobile=false}');
  expect(r3f).toContain('function FloatingFragments({mobile=false}');
  expect(r3f).toContain('<GlassCube mobile/>');
  expect(r3f).toContain('<Rings subtle/>');
  expect(r3f).toContain('pointLight intensity={mobile?7');
  expect(r3f).toContain('const camera=mobile?{position:[0,0,8.6]');
}

test('mobile art direction source contract', () => assertMobileSourceContract());

async function inspectHero(page) {
  await page.locator('[data-mobile-hero="true"]').waitFor({ state: 'visible' });
  await page.waitForTimeout(900);
  return page.evaluate(() => {
    const rect = selector => document.querySelector(selector)?.getBoundingClientRect();
    const heroCopy = rect('.mobile-art-intro');
    const founderStack = document.querySelector('.mobile-art-founders');
    const founder1 = founderStack?.querySelector(':scope > div:nth-child(1)')?.getBoundingClientRect();
    const founder2 = founderStack?.querySelector(':scope > div:nth-child(2)')?.getBoundingClientRect();
    const serviceGrid = rect('.mobile-art-services');
    const marquee = document.querySelector('.marquee')?.getBoundingClientRect();
    const servicesSection = document.querySelector('#services')?.getBoundingClientRect();
    const viewport = window.innerWidth;
    const offenders = [...document.querySelectorAll('body *')].flatMap(element => {
      if (element.closest('.marquee') || element.classList.contains('anime-cursor')) return [];
      const r = element.getBoundingClientRect();
      return r.right > viewport + .5 || r.left < -.5 ? [element.tagName.toLowerCase()] : [];
    }).slice(0,20);
    return { presentation:document.documentElement.dataset.presentation, heroCopy, founder1, founder2, serviceGrid, marquee, servicesSection, founderCount:document.querySelectorAll('.mobile-art-founder').length, serviceCount:document.querySelectorAll('.mobile-art-service-card').length, mobileHeroCount:document.querySelectorAll('.mobile-art-hero').length, desktopHeroCount:document.querySelectorAll('.hero-reference-shell').length, offenders, scrollWidth:document.documentElement.scrollWidth, viewport, maxTouchPoints:navigator.maxTouchPoints, coarse:window.matchMedia('(pointer: coarse)').matches, hoverNone:window.matchMedia('(hover: none)').matches };
  });
}

for (const width of widths) {
  test(`mobile/compact hero flow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height:844 });
    await page.goto(url, { waitUntil:'domcontentloaded' });
    const result = await inspectHero(page);
    expect(['mobile','compact']).toContain(result.presentation);
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
  });
}

for (const width of visualWidths) {
  test(`visual evidence screenshot at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height:900 });
    await page.goto(url, { waitUntil:'networkidle' });
    if (width <= 1024) await page.locator('[data-mobile-hero="true"]').waitFor({ state:'visible' });
    else await page.locator('.hero-reference-shell').waitFor({ state:'visible' });
    await page.waitForTimeout(1400);
    await page.screenshot({ path:`test-results/visual-${width}.png`, fullPage:false });
  });
}

test('Android Chrome Desktop Site uses touch-first compact presentation', async ({ browser }) => {
  const desktopChromeUA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';
  const context=await browser.newContext({ viewport:{width:1280,height:844}, screen:{width:412,height:915}, hasTouch:true, isMobile:true, userAgent:desktopChromeUA, deviceScaleFactor:2 });
  const page=await context.newPage();
  try {
    await page.goto(url,{waitUntil:'networkidle'});
    const result=await inspectHero(page);
    await page.screenshot({path:'test-results/android-desktop-site.png',fullPage:false});
    expect(result.presentation).toBe('compact');
    expect(result.desktopHeroCount).toBe(0);
    expect(result.mobileHeroCount).toBe(1);
    expect(result.founderCount).toBe(2);
    expect(result.serviceCount).toBe(4);
    expect(result.maxTouchPoints).toBeGreaterThan(0);
    expect(result.coarse || result.hoverNone).toBeTruthy();
    expect(result.scrollWidth).toBeLessThanOrEqual(result.viewport);
    expect(result.heroCopy.bottom).toBeLessThan(result.founder1.top);
    expect(result.founder1.bottom).toBeLessThan(result.founder2.top);
    expect(result.founder2.bottom).toBeLessThan(result.serviceGrid.top);
    expect(result.serviceGrid.bottom).toBeLessThan(result.marquee.top);
    expect(result.marquee.bottom).toBeLessThanOrEqual(result.servicesSection.top);
    expect(result.offenders).toEqual([]);
  } finally { await context.close(); }
});

test('desktop mouse keeps desktop hero', async ({ page }) => {
  await page.setViewportSize({width:1280,height:800});
  await page.goto(url,{waitUntil:'networkidle'});
  await page.locator('.hero-reference-shell').waitFor({state:'visible'});
  await expect(page.locator('.mobile-art-hero')).toHaveCount(0);
  await expect(page.locator('.hero-reference-shell')).toHaveCount(1);
  await expect(page.locator('html')).toHaveAttribute('data-presentation','desktop');
});

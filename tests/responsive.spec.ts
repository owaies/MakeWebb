import { test, expect } from '@playwright/test'

test('layout stays in flow without horizontal overflow', async ({page}) => {
  await page.goto('/')
  await expect(page.locator('h1')).toContainText('MakeWebb')
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth)
  expect(overflow).toBeLessThanOrEqual(1)
})

test('mobile founder order and service flow', async ({page}) => {
  await page.setViewportSize({width:390,height:844})
  await page.goto('/')
  const cards=page.locator('.founder-card')
  expect(await cards.count()).toBe(2)
  const first=await cards.nth(0).boundingBox();const second=await cards.nth(1).boundingBox();const services=await page.locator('.hero-services').boundingBox()
  expect(first?.y).toBeLessThan(second?.y ?? 0)
  expect(second?.y ?? 0).toBeLessThan(services?.y ?? 0)
})

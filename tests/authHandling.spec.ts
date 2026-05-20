import { test, expect, chromium, Browser, BrowserContext, Page } from '@playwright/test'

test.describe('Authentication handling in Playwright', () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    test.beforeAll(async () => {

        browser = await chromium.launch()
        context = await browser.newContext()
        page = await context.newPage()

        await page.goto('https://testcms.reco-claims.ca/')
        await page.getByRole('textbox', { name: 'Username' }).fill('info+programmanager@xlgclaims.com')
        await page.getByRole('textbox', { name: 'Password' }).fill('Test1234!')
        await page.getByRole('button', { name: 'Login' }).click()
        await page.waitForTimeout(15000)
        await context.storageState({ path: 'storageState.json' })
        await browser.close()
    })

    test.beforeEach(async () => {
        browser = await chromium.launch()
        context = await browser.newContext({storageState: 'storageState.json'})
        page = await context.newPage()
        await page.goto('https://testcms.reco-claims.ca/')
    })

    test.afterEach(async ()=> {
        await browser.close()
    })


    test('verify search box is visble', async () => {
        await expect(page.getByRole('textbox', { name: 'Search' })).toBeVisible()
        await page.waitForTimeout(10000)
    })


    test('verify table header is visible', async () => {
        await expect(page.locator('thead')).toBeVisible()
        await page.waitForTimeout(10000)
    })




})
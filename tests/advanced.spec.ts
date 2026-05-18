import { test, expect, chromium, firefox, webkit } from '@playwright/test'

test.describe('Advanced playwright element handling', () => {


    test('element state checks ischecked(), is editable()', async ({ page }) => {

        // isChecked, isVisible, isDisabled, isEditable, isHidden

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

        await page.getByTestId('remember-checkbox').check()

        const elementChecked = await page.getByTestId('remember-checkbox').isChecked()

        console.log("elementChecked==>" + elementChecked);

        const elementEditable = await page.getByTestId('name-input').isEditable()

        console.log("elementEditable==>" + elementEditable);
    })


    test('element state check - isVisible', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('hidden-dropdown-toggle-btn').click()

        const elementVisible = await page.getByTestId('hidden-dropdown-select').isVisible()

        console.log("elementVisible===>" + elementVisible);


        const elementDisabled = await page.getByTestId('dynamic-option-select').isDisabled()

        console.log("elementDisabled===>" + elementDisabled);

    })


    test('Handling Dynamic dropdown', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('dynamic-group-select').selectOption('Locators')

        const elementDisabled = await page.getByTestId('dynamic-option-select').isDisabled()

        if (elementDisabled === false) {
            await page.getByTestId('dynamic-option-select').selectOption('getByRole + name')
        }

        await expect(page.getByText('Dynamic dropdown selected: getByRole + name.')).toBeVisible()

    })


    test('Handling hidden dropdown', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        const elementHidden = await page.getByTestId('hidden-dropdown-select').isHidden()

        if (elementHidden === true) {

            await page.getByTestId('hidden-dropdown-toggle-btn').click()

            await page.getByTestId('hidden-dropdown-select').selectOption('Hidden - Core')
        }
    })



    test('handling boostrap dropdown', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('bootstrap-dropdown-trigger').click()

        await page.getByText('Weekday Batch').click()

        await expect(page.getByText('Bootstrap dropdown selected: Weekday Batch.')).toBeVisible()

    })


    test('handling alert popup', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        // page.on('dialog', async dialog=> {
        //     console.log(dialog.message());
        //     await dialog.accept()

        // })

        // await page.getByTestId('alert-btn').click()


        // page.on('dialog', async dialog => {
        //     console.log(dialog.message());
        //     await dialog.dismiss()

        // })

        // await page.getByTestId('confirm-btn').click()

        // await expect(page.getByText('Confirm dismissed.')).toBeVisible()


        page.on('dialog', async dialog => {
            console.log(dialog.message());
            await dialog.accept('Playwright')

        })

        await page.getByTestId('prompt-btn').click()
        await expect(page.getByText('Prompt value: Playwright')).toBeVisible()

    })


    test('Handling new Tab', async () => {

        const browser = await chromium.launch()
        const context = await browser.newContext()
        const page = await context.newPage()

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            page.getByTestId('popup-link').click()
        ])

        await expect(newPage.getByText('Popup Opened Successfully')).toBeVisible()

        await newPage.waitForTimeout(5000)

        await page.bringToFront()

        await expect(page.getByText('Open popup tab (right click only)')).toBeVisible()

        await page.waitForTimeout(5000)

    })


    test('Open a new tab direct click blocked', async () => {

        const browser = await chromium.launch()
        const context = await browser.newContext()
        const page = await context.newPage()

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('popup-right-click-link').click()

        await expect(page.getByText('Direct click blocked. Use right click -> Open link in new tab.')).toBeVisible()

        const link = await page.getByTestId('popup-right-click-link').getAttribute('href')

        console.log(link);

        const pageTwo = await context.newPage()

        await pageTwo.goto(`https://playwright-mastery-academy-app.vercel.app/${link}`)

        await expect(pageTwo.getByText('Popup Opened Successfully')).toBeVisible()

        await pageTwo.waitForTimeout(3000)


    })


    test('isolated context', async () => {
        test.setTimeout(180000)
        const browser = await chromium.launch()

        const context = await browser.newContext()
        const page = await context.newPage()

        await page.goto('https://testcms.reco-claims.ca/Login')
        await page.locator('[name="Username"]').fill('info+programmanager@xlgclaims.com')
        await page.locator('[name="Password"]').fill('Test1234!')
        await page.locator('[type="submit"]').click()

        await page.waitForTimeout(10000)

        const contextTwo = await browser.newContext()
        const pageTwo = await contextTwo.newPage()

        await pageTwo.goto('https://testcms.reco-claims.ca/Login')
        await pageTwo.locator('[name="Username"]').fill('info+programmanager@xlgclaims.com')
        await pageTwo.locator('[name="Password"]').fill('Test1234!')
        await pageTwo.locator('[type="submit"]').click()

        await pageTwo.waitForTimeout(10000)

        const cookie = await context.cookies()
        const cookieTwo = await contextTwo.cookies()

        console.log("cookie===>" + JSON.stringify(cookie));
        console.log(("cookieTwo===>" + JSON.stringify(cookieTwo)));

    })


    test('handling drag and drop', async ({ page }) => {


        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('drag-source').dragTo(page.getByTestId('drop-target'))

        await expect(page.getByText('Drop completed successfully.')).toBeVisible()

    })


    test('handling single and multiple files upload', async ({ page }) => {



        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('file-upload-input').setInputFiles('uploads/practice-data.csv')

        await page.getByTestId('multi-file-upload-input').setInputFiles(['uploads/practice-data.csv', 'uploads/practice-data.xml', 'uploads/practice-notes.txt', 'uploads/practice-report.pdf'])

        await page.waitForTimeout(5000)


    })



    test('handling downloads', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        const [downloadFile] = await Promise.all([
            page.waitForEvent('download'),
            page.getByTestId('download-pdf-btn').click()
        ])

        const fileName = await downloadFile.suggestedFilename()

        await downloadFile.saveAs(`downloads/${fileName}`)

    })


    test('handling iframe', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        const iframe = await page.frameLocator('#practice-iframe')

        await iframe.locator('#frame-input').fill('Playwright')

        await iframe.locator('#frame-save').click()

        await expect(iframe.locator('#frame-result')).toContainText('Playwright saved')

    })


    test('handling shadow DOM', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        const showdowHost = await page.getByTestId('shadow-host')

        await showdowHost.locator('#shadow-input').fill('TypeScript')

        await showdowHost.locator('#shadow-save').click()

        await expect(showdowHost.getByText('TypeScript saved')).toBeVisible()


    })


    test('handling date picker using type and fill', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('practice-date-picker').type('01-11-1995')

        await page.waitForTimeout(5000)

        await page.getByTestId('practice-date-picker').fill('1995-11-01')

        await page.waitForTimeout(5000)


    })

    test('handling date picker using DOM manipulation', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        const datePicker = await page.getByTestId('interview-date-picker')

        await datePicker.evaluate((dom, val) => {

            const html = dom as HTMLInputElement
            html.value = val as string
            html.dispatchEvent(new Event('input'))


        }, "1995-11-01")

        await page.waitForTimeout(5000)




    })




    test('Advanced Wait commands', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        // await page.getByTestId('wait-navigation-link').click()
        // await page.waitForURL('https://playwright-mastery-academy-app.vercel.app/practice/popup?source=waitfornavigation')
        // await expect(page.getByText('Popup Opened Successfully')).toBeVisible()

        // await page.getByTestId('wait-response-btn').click()
        // await page.waitForResponse('https://playwright-mastery-academy-app.vercel.app/api/practice/waits-status')
        // await expect(page.getByText('Trigger API Response Completed')).toBeVisible()


        // await page.getByTestId('wait-response-btn').click()
        // await page.getByText('Trigger API Response Completed').waitFor({state: 'visible'})
        // await expect(page.getByText('Trigger API Response Completed')).toBeVisible()

        // // hidden - locator hidden in dom should not be visible
        // // attached - Locator exists in DOM
        // // detached - locator should not exists in DOM and should not be visible


        // await page.getByTestId('wait-response-btn').click()
        // await page.waitForSelector('//*[contains(text(), "Trigger API Response Completed")]')
        // await expect(page.getByText('Trigger API Response Completed')).toBeVisible()


        // load - DOM ready, images load, speed - medium
        // await page.getByTestId('wait-loadstate-practice-load-btn').click()
        // await page.waitForLoadState('load')
        // await expect(page.getByText('Test load State: Completed')).toBeVisible()

        // // domContentLoaded - DOM ready - speed - fast
        // await page.getByTestId('wait-loadstate-practice-dom-btn').click()
        // await page.waitForLoadState('domcontentloaded')
        // await expect(page.getByText('Test DOMContentLoaded State: Completed')).toBeVisible()


        // //networkidle - DOM ready, images load, API calls completed - speed - slow
        // await page.getByTestId('wait-loadstate-practice-networkidle-btn').click()
        // await page.waitForLoadState('networkidle')
        // await expect(page.getByText('Test Network Idle State: Completed')).toBeVisible()

    })


    test('Handling mouse actions', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('mouse-downup-target').hover()

        await page.mouse.down()

        await expect(page.getByText('Mouse down detected.')).toBeVisible()

        await page.mouse.up()

        await expect(page.getByText('Mouse down + up detected.')).toBeVisible()

        await page.getByTestId('mouse-rightclick-target').click({ button: 'right' })

        await expect(page.getByText('Right click detected on target.')).toBeVisible()


        await page.getByRole('heading', { name: 'Mouse Actions' }).scrollIntoViewIfNeeded()

        await page.waitForTimeout(2000)


        await page.getByTestId('mouse-wheel-target').hover()
        await page.mouse.wheel(0, 300)
        await expect(page.getByText('Mouse wheel scrolled down.')).toBeVisible()



    })


    test('force actions - not recommended', async ({ page }) => {

        // click, dblclick, check, uncheck, selectOption, fill, type

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        // Attched into DOM
        //visible
        //Stable
        //enable
        //Not covered by another element

        await page.getByTestId('force-click-btn').click({ force: true })
    })



    test('element screenshot and page screenshot', async ({ page }) => {


        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('wait-response-btn').screenshot({ path: 'screenshots/triggerAPIResponseBtn.png' })


        await page.screenshot({ path: 'screenshots/pageScreenshot.png', fullPage: true })


    })



    test('retrying assertions, not retrying assertions and negating assertions', async ({ page }) => {

        // retrying assertions - 5 secs


        // viisblity & state

        // expect(locator).tobevisible() 
        // expect(locator).tobeHidden() 
        // expect(locator).toBeEnabled() 
        // expect(locator).toBeDisabled()
        // expect(locator).toBeChecked() 
        // expect(locator).toBeEditable()


        // text

        //expect(locator).toHaveText('exact text') 
        // expect(locator).toContainText('partially matching text') 
        // expect(locator).toHaveValue('value') 
        // expect(locator).toHaveAttribute('attr value') 
        // expect(locator).toHaveClass('class-name') 
        // expect(locator).toHaveCount(1) 
        // expect(locator).toHaveId('id') 


        // page

        // expect(page).toHaveTitle('playwright')
        // expect(page).toHaveURL('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        //other assertions

        // expect(locator).toBeEmpty() 
        // expect(locator).toBeFocused() 



        // non retrying assertions

        // expect(5).toBe(5)
        // expect(5).toEqual(5)
        // expect(5).toStrictEqual(5)
        // expect(true).toBeTruthy()
        // expect(false).toBeFalsy()
        // expect(5).toBeGreaterThan(3)
        // expect(5).toBeLessThan(10)
        // expect(5).toBeGreaterThanOrEqual(5)
        // expect(5).toBeLessThanOrEqual(5)
        // expect(10).toContain([10, 20, 30])


        // negating assertions


        //expect(locator).not.toBeVisible()

        // expect(5).not.toBe(10)



    })



    test('hard and soft assertions', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

        await expect(page.getByText('Interactive Playwright Sandbox Basic')).toBeVisible()

        await page.getByTestId('single-click-btn').click()

        await expect.soft(page.getByText('Single click completed wrong.')).toBeVisible()

        await page.getByTestId('double-click-btn').dblclick()

        await expect(page.getByText('Double click completed.')).toBeVisible()

        await page.getByTestId('hover-btn').hover()

        await expect(page.getByText('Hover triggered successfully.')).toBeVisible()

        await page.getByTestId('tooltip-trigger-btn').hover()

        await expect(page.getByText('Tooltip verified').first()).toBeVisible()


    })







})
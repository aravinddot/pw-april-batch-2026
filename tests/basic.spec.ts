import { test, expect } from '@playwright/test'


test.describe('Basic element handling tests', () => {
test.slow()
    // only, skip, fail, fixme, slow

    test.describe.configure({timeout: 180000})

    test.only('Handiling Click, Double Click, Hover, Tooltip, Static Dropdown', async ({ page }) => {

        // test 30000ms timeout

        test.setTimeout(300000)

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic', {timeout: 120000})

        await expect(page.getByText('Interactive Playwright Sandbox Basic')).toBeVisible()

        await page.getByTestId('single-click-btn').click({timeout: 60000})

        await expect(page.getByText('Single click completed.')).toBeVisible({timeout: 60000})

        await page.getByTestId('double-click-btn').dblclick()

        await expect(page.getByText('Double click completed.')).toBeVisible()

        await page.getByTestId('hover-btn').hover()

        await expect(page.getByText('Hover triggered successfully.')).toBeVisible()

        await page.getByTestId('tooltip-trigger-btn').hover()

        await expect(page.getByText('Tooltip verified').first()).toBeVisible()

        await expect(page.getByText('Tooltip verified successfully.')).toBeVisible()

        await page.getByTestId('static-practice-select').selectOption('Easy - Basic locator targeting')

        await expect(page.getByTestId('static-dropdown-status')).toContainText('Static dropdown selected: Easy')


    })


    test('Handling Inputs, Checkbox, Radio, Dropdown', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

        const name = 'Playwright'
        const emailid = 'info@playwrightmasteryacademy.com'
        const dropdownValue = 'Playwright Core'

        await page.getByTestId('name-input').fill(name)

        await page.getByTestId('email-input').fill(emailid)

        await page.getByTestId('track-select').selectOption(dropdownValue)

        await page.getByTestId('remember-checkbox').check()

        await page.getByTestId('mode-api-radio').check()

        await page.getByTestId('submit-form-btn').click()

        await expect(page.getByText(`${name} submitted (${emailid}) for ${dropdownValue}`)).toBeVisible()


    })



    test('Handling Static Waits, Keyboard', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

        await page.getByTestId('async-load-btn').click()

        await page.waitForTimeout(20000)

        await expect(page.getByText('Async result loaded successfully.')).toBeVisible()


        await page.getByTestId('keyboard-input').fill('playwright')

        await page.getByTestId('keyboard-input').press('Enter')

        await expect(page.getByText('Command submitted: playwright')).toBeVisible()


        // Tab, Escape, Backspace, Delete, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Space, 

        // a to z , 1 to 0

        // Control+C, Control+V, Shift+Tab

    })


    test('Handling Text and Attribute Extraction', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')


        // extract only visible text - return string data type
        const innerTextValue = await page.getByTestId('extract-textcontent-target').innerText()

        console.log('innerTextValue===>' + innerTextValue);

        // extract visible and hidden text - return string data type
        const textContentValue = await page.getByTestId('extract-textcontent-target').textContent()

        console.log("value==>" + textContentValue);


        const value = await page.getByTestId('extract-inputvalue-target').inputValue()

        console.log("value===>" + value);


        const attrValue = await page.getByTestId('extract-attribute-target').getAttribute('class')

        console.log('attrValue===>' + attrValue);

        // extract all visible text - return type array
        const allInnerTextValue = await page.getByTestId('extract-list-item').allInnerTexts()

        console.log("allInnerTextValue==>" + allInnerTextValue);

        // extract all visible and hidden text - return type array
        const allTextContentValue = await page.getByTestId('extract-list-item').allTextContents()

        console.log("allTextContentValue==>" + allTextContentValue);


        const html = await page.getByTestId('extract-list').innerHTML()

        console.log("html===>" + html);


    })

})
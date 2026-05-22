import {test, expect} from '@playwright/test'




test('playwright other built in functions', async({page})=> {


    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')


    await page.reload()

    await page.getByText('Network Labs').click()

    await page.waitForTimeout(2000)

    await page.goBack()

    await page.goForward()


    console.log(await page.title());

    console.log(await page.url());

    //console.log(await page.content());
    
    console.log(await page.viewportSize());
    
    await page.getByLabel('Primary navigation').getByRole('link', { name: 'Practice' }).click()

    await page.waitForTimeout(2000)
    


})
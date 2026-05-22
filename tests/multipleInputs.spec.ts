import { test, expect } from '@playwright/test'


test.describe('Handling Multiple Inputs in Playwright', () => {

    const users = [
        { username: 'standard_user', password: 'secret_sauce', expectedText: 'Sauce Labs Backpack' },
        { username: 'problem_user', password: 'secret_sauce', expectedText: 'Sauce Labs Bike Light' }
    ]

    for (const user of users) {

        test(`Handling Multiple Inputs ${user.username}`, async ({ page }) => {

            await page.goto('https://www.saucedemo.com/')

            await page.getByPlaceholder('Username').fill(user.username)
            await page.getByPlaceholder('Password').fill(user.password)
            await page.locator('#login-button').click()

            await expect(page.getByText(user.expectedText)).toBeVisible()

        })

    }




})
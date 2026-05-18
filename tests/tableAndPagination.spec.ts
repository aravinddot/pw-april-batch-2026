import {test, expect} from '@playwright/test';


test('Handling Tables and Pagination', async ({ page }) => {

    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/table-pagination')

    await expect(page.getByText('Advanced Table Pagination and Filtering Lab')).toBeVisible()

    await page.getByTestId('page-size-select').selectOption('100')

    const rowCount = await page.locator('tbody tr').count()

    console.log("rowCount==>"+ rowCount);


    const paginationText = await page.getByTestId('pagination-current').textContent() || ""
    console.log("Pagination Text==>"+ paginationText);

    const splittedText = paginationText.split(' ')

    console.log("Splitted Text==>"+ splittedText);

    console.log(splittedText[3]); 

    for(let i = 1; i < Number(splittedText[3]); i++) {

        for(let j = 0; j < rowCount; j++) {
            const row = await page.locator('tbody tr').nth(j).locator('td').allTextContents()

            console.log(j + " => " + row);
            
        }

        await page.getByTestId('pagination-next').click()
    }

    
    



})
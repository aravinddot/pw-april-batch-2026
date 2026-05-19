import { test, expect } from '@playwright/test'


test.describe('Hooks in Playwright', () => {

    test.beforeAll(() => {
        console.log("before all executed");
    })

    test.afterAll(() => {
        console.log("after all executed");
    })

    test.beforeEach(() => {
        console.log("before each executed");
    })

    test.afterEach(() => {
        console.log("after each executed");
    })

    test('test case 1', async () => {
        console.log("test case 1 executed");
    })

    test('test case 2', async () => {
        console.log("test case 2 executed");
    })


})
import { test, expect } from '@playwright/test'

import testData from '../test-data/jsonData.json'

import XLSX from 'xlsx'

import fs from 'fs'

import {parse} from 'csv-parse/sync'


const { userName, password, email } = testData


test.describe('Data Driven Testing', () => {


    test('read data from json file', async () => {

        const data = fs.readFileSync('test-data/jsonData.json', 'utf-8')

        console.log(data);
        

        // console.log(userName);
        // console.log(password);
        // console.log(email);

        // console.log(testData.userName);
    })

    test('read data from excel file', async () => {

        type userData = {
            username: string,
            password: string,
            index: number,
            expected: string
        }

        const file = XLSX.readFile('test-data/Book1.xlsx')

        const sheet = file.Sheets['Sheet1']

        // const data: userData[] = XLSX.utils.sheet_to_json(sheet)


        // console.log(data[0].username);

        const cellValue = sheet['A2'].v

        console.log(cellValue);
        


    })


    test('read data from csv file', async()=> {


        const file = fs.readFileSync('test-data/users.csv')

        const data = parse(file, {
            columns: true
        })

        console.log(data);
        




    })

})
import { uploadResume, downloadResume } from './helpers'
import puppeteer from "puppeteer"; 
import { Request, Response } from 'express'
import { logger, asyncCompletionViaWebHook } from './helpers'

/**
 * @function
 * Final handler for the form submission route. rpaController uses Puppeteer and 
 * helper functions to send supplied data to Frontier's submission form.
 * @param {*} req Request object
 * @param {*} res Response to return
 */
export async function rpaController (req: Request, res: Response) {
    try{
        const candidateData = req.body
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()
        await page.goto('https://frontier.jobs/jobs/190562/apply/about', {waitUntil: 'networkidle2'})
        await page.type('[name = "fullname"]', candidateData.firstname)
        await page.type('[name = "lastname"]', candidateData.lastname)
        await page.type('[name = "email"]', candidateData.email)
        await page.type('[name = "phoneno"]', candidateData.phone)
        await page.click('[name = "location"]')
        await page.keyboard.type(candidateData.location)
        await page.waitForTimeout(1000)
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('NumpadEnter')
        await page.waitForTimeout(1000)
        await page.type('[name = "linkedin"]', candidateData.linkedin)
        await page.click('[href="/jobs/190562/apply/resume"]')
        await page.waitForTimeout(1000)
        await downloadResume(candidateData.resume)
        asyncCompletionViaWebHook({page: page, browser: browser, candidateData: candidateData});//
        res.status(201).json({ status: 'success', message: `Thank you for applying! We are uploading your data and this may take a while. We will notify you as soon as it's done`})
    } catch(error: any){
        logger('error', error?.message || error)
        res.status(500).json({ status: 'failed', message: 'Something went wrong, please try again or contact support'})
    }
}
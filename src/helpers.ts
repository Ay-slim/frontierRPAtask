import path from "path";
import request from "request";
import fs from "fs";
import RateLimiter from 'express-rate-limit';
import winston from 'winston';
import { config } from 'dotenv';

config();

const resumePath = path.resolve('resume');
const { WEBHOOKURL } = process.env;
/**
 * @function
 * Clicks on the resume upload button and sends the file path for upload
 * @param {*} page Page object from the controller
 */
export async function uploadResume(page: any) {
    const [fileChooser] = await Promise.all([
        page.waitForFileChooser(),
        page.click('[class="sc-dOSReg lhXIuw"]'),
      ]);
      await fileChooser.accept([resumePath]);
}

/**
 * @function
 * Downloads candidate's resume from a supplied url
 * @param {*} url Link containing resume
 **/
export const downloadResume = (url: string) => {
    const file = fs.createWriteStream(resumePath);
    const sendReq = request.get(url);

    // verify response code
    sendReq.on('response', (response) => {
        if (response.statusCode !== 200) {
            return ('Download did not work');
        }

        sendReq.pipe(file);
    });
    file.on('finish', () => file.close());
};

/**
 * @constant
 * DDOS attack preventer. App should not allow a user
 * make more than 600 requests every 10 minutes i.e a request per second
 */
export const APP_USE_LIMIT = RateLimiter({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 600, // limit each IP to 600 requests every 10 minutes, i.e a request per second,
    message: 'Too many requests from this user, please try again after 5 minutes',
  });

const myformat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level} ${info.message} ${info.stack}`
  )
);

/**
 * Winston logger. Logs any caught errors to file
 */
const errorLogger = winston.createLogger({
  level: 'warning',
  transports: [
    new winston.transports.File({
      filename: 'error.log',
      level: 'warning',
      maxsize: 500,
      format: myformat
    }),
    new winston.transports.Console({
      format: myformat,
    }),
  ],
});

export function logger(level: 'warning' | 'error' | 'info', logInfo: any) {
    return errorLogger.log(level, logInfo);
  }

export async function asyncCompletionViaWebHook (packet: any) {
  const { page, browser, candidateData } = packet;
  const webhook = candidateData.webhook || WEBHOOKURL;
  function sendWebHook (body: any) { //To avoid DRY
    request.post(webhook, {
      body: body
      }
    )
  };
  try{
    await uploadResume(page);
    await page.waitForTimeout(1000);
    await page.click('[href="/jobs/190562/apply/review"]');
    await page.waitForTimeout(2000);
    await page.click('[href="/jobs/190562/apply/done"]');
    await page.waitForTimeout(1000);
    browser.close();
    sendWebHook({
      data: candidateData, 
      status: 'Success', 
      message: 'Your data has been uploaded successfully. Good luck!'
      })
  }catch (err: any) {
    sendWebHook({
      data: null,
      status: 'Error',
      message: err.message
    })
  }
}
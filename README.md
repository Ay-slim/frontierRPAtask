# FrontierRPAtask

## Description
This simple endpoint accepts json data and submits it (using the Puppeteer npm library) to the form URL, returning appropriate responses as shown below:

```
POST /forms/frontier/applications
{
  "firstname": "Dangbana",
  "lastname": "Orisha",
  "email": "dangbana@orisha.com",
  "phone": "+193040202",
  "location": "Oregon",
  "linkedin": "linkedin.com/dangbanaorisha" 
  "resume": "https://frontier-public-assets.s3-us-west-2.amazonaws.com/05oo7evmr4hsc7ufvmdcpojlh1ki1rd3benjo0g1_Brian_CV.docx"  # link to publicliy available Resume
}

Successful response:
201 Created
{
  "status": "success",
  "message": "Your application has been sent, good luck!",
  "data": {
    "firstname": "Dangbana",
    "lastname": "Orisha",
    "email": "dangbana@orisha.com",
    "phone": "+193040202",
    "location": "Oregon",
    "linkedin": "linkedin.com/dangbanaorisha",
    "resume": "https://frontier-public-assets.s3-us-west-2.amazonaws.com/05oo7evmr4hsc7ufvmdcpojlh1ki1rd3benjo0g1_Brian_CV.docx"
  }
}

Error response 1 (e.g. Missing required field or invalid type):
422 Unprocessable Entity
{
  "status": "failed",
  "message": "\"email\" is required"
}

Error response 2 (e.g. Timed out request or server problems):
500 Internal Server Error
{
  "status": "failed",
  "message": "Something went wrong, please try again or contact support"
}
```
## Setup
- Clone this repository into a directory on your local machine
- CD into the directory and run _npm install_ or _npm i_ to install dependencies and libraries
- Still in the directory, run _npm start_ at your terminal to get the server running on port 5500 or a specified port in your .env file.
- To test manually, send a post request with the body shown above to http://localhost:5500/forms/frontier/applications
- Two unit tests were written to check that the endpoint works as it should and sends the appropriate responses. The first checks for a successful response while the second test checks that input validation is enforced. Run _npm test_ to initiate the tests (note that the first test might take a while to complete)

![test](https://github.com/Ay-slim/frontierRPAtask/blob/main/frontier.PNG?raw=true)

## Files structure
-index.ts: The main file where the express app is set up to listen for requests and it calls a couple of other files in which the app's functionalities are abstracted away.

-controller.ts: The workhorse of the app. It accepts the requests routed through the app in index.js and uses the Puppeteer library to connect to the form page, fill in the details, downloada and upload the resume (through helper functions) and return the appropriate success or error response.

-validator.ts: Enforces validation rules on the incoming request before it reaches index.ts.

-helpers.ts: Contains various helper functions such as logging and download/upload

-test.ts: Holds the two test cases for automatically confirming whether the endpoint works.

-readme.md: Of course, you're reading me!

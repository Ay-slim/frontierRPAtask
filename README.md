# FrontierRPAtask

## Description
This simple endpoint accepts json data and submits it (using the Puppeteer npm library) to the form URL as shown below:

POST /forms/frontier/applications
```
{
  "firstname": "Test",
  "lastname": "Lastname",
  "phone": "+1 234 234 0000",
  "location": "London, UK",
  "linkedin": "linkedin.com/profile/me" 
  "resume": "https://frontier-public-assets.s3-us-west-2.amazonaws.com/05oo7evmr4hsc7ufvmdcpojlh1ki1rd3benjo0g1_Brian_CV.docx"  # link to publicliy available Resume
}
```
## Setup
- Clone this repository into a directory on your local machine
- CD into the directory and run _npm install_ or _npm i_ to install dependencies and libraries
- Still in the directory, run _npm start_ at your terminal to get the server running on port 5500 or a specified port in your .env file.
- Two unit tests were written to check that the endpoint works as it should and sends the appropriate responses. The first checks for a successful response while the second test checks that input validation is enforced. Run _npm test_ to initiate the tests (note that the first test might take a while to complete)
